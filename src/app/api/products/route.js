import pool from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";
import {
    getProductBySlug,
    getProducts,
    normalizeImagesForInsert,
    resolvePrimaryImage,
} from "@/lib/products";
import { requireManager } from "@/lib/require-manager";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const includeInactive = searchParams.get("manage") === "true";
        const featured = searchParams.get("featured") === "true";

        if (includeInactive) {
            const auth = await requireManager();
            if (auth.response) {
                return auth.response;
            }
        }

        const products = await getProducts({ includeInactive, featured });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);

        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 },
        );
    }
}

export async function POST(request) {
    const auth = await requireManager();
    if (auth.response) {
        return auth.response;
    }

    const client = await pool.connect();

    try {
        const body = await request.json();
        const {
            name,
            brand,
            sku,
            categoryId,
            description,
            price,
            oldPrice,
            isActive = true,
            featured = false,
            images = [],
            variants = [],
        } = body;

        if (!name?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product name is required",
                },
                { status: 400 },
            );
        }

        if (!categoryId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category is required",
                },
                { status: 400 },
            );
        }

        if (!price || Number(price) <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A valid price is required",
                },
                { status: 400 },
            );
        }

        if (oldPrice && Number(oldPrice) <= Number(price)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Compare-at price must be higher than the selling price",
                },
                { status: 400 },
            );
        }

        const normalizedImages = normalizeImagesForInsert(
            images,
            name.trim(),
        );

        if (!normalizedImages.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one product image is required",
                },
                { status: 400 },
            );
        }

        const categoryResult = await client.query(
            `SELECT id FROM categories WHERE id = $1 LIMIT 1`,
            [categoryId],
        );

        if (categoryResult.rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Selected category does not exist",
                },
                { status: 400 },
            );
        }

        let slug = slugify(name.trim(), {
            lower: true,
            strict: true,
        });

        if (!slug) {
            slug = `product-${Date.now()}`;
        }

        const slugCheck = await client.query(
            `SELECT id FROM products WHERE slug = $1 LIMIT 1`,
            [slug],
        );

        if (slugCheck.rows.length > 0) {
            slug = `${slug}-${Date.now()}`;
        }

        const normalizedSku = sku?.trim().toUpperCase() || null;

        if (normalizedSku) {
            const skuCheck = await client.query(
                `SELECT id FROM products WHERE sku = $1 LIMIT 1`,
                [normalizedSku],
            );

            if (skuCheck.rows.length > 0) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "This SKU is already in use",
                    },
                    { status: 400 },
                );
            }
        }

        const totalStock = variants.reduce((total, variant) => {
            return total + (Number(variant.stock) || 0);
        }, 0);

        const primaryImage = resolvePrimaryImage(normalizedImages, name.trim());
        const productAlt = primaryImage.altText;

        await client.query("BEGIN");

        const productResult = await client.query(
            `INSERT INTO products (
                category_id,
                name,
                slug,
                description,
                price,
                old_price,
                stock,
                alt_text,
                is_active,
                featured,
                image,
                alt,
                rating,
                reviews,
                in_stock,
                brand,
                sku
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 0, 0, $13, $14, $15)
            RETURNING *`,
            [
                categoryId,
                name.trim(),
                slug,
                description?.trim() || null,
                Number(price),
                oldPrice ? Number(oldPrice) : null,
                totalStock,
                productAlt,
                Boolean(isActive),
                Boolean(featured),
                primaryImage.imageUrl,
                productAlt,
                totalStock > 0,
                brand?.trim() || null,
                normalizedSku,
            ],
        );

        const product = productResult.rows[0];

        for (const image of normalizedImages) {
            await client.query(
                `INSERT INTO product_images (
                    product_id,
                    image_url,
                    alt_text,
                    is_primary,
                    display_order
                ) VALUES ($1, $2, $3, $4, $5)`,
                [
                    product.id,
                    image.imageUrl,
                    image.altText,
                    Boolean(image.isPrimary),
                    image.displayOrder,
                ],
            );
        }

        for (const variant of variants) {
            if (!variant.size) {
                continue;
            }

            await client.query(
                `INSERT INTO product_variants (
                    product_id,
                    size,
                    color,
                    stock
                ) VALUES ($1, $2, $3, $4)`,
                [
                    product.id,
                    String(variant.size),
                    variant.color ? String(variant.color) : null,
                    Number(variant.stock) || 0,
                ],
            );
        }

        await client.query("COMMIT");

        const createdProduct = await getProductBySlug(product.slug, {
            includeInactive: true,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                product: createdProduct,
            },
            { status: 201 },
        );
    } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        console.error("CREATE PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create product",
                error:
                    process.env.NODE_ENV === "development"
                        ? error.message
                        : undefined,
            },
            { status: 500 },
        );
    } finally {
        client.release();
    }
}
