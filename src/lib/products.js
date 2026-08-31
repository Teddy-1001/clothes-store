import pool from "@/lib/db";

const LOW_STOCK_THRESHOLD = 10;

export function getProductStatus({ isActive, stock }) {
    if (!isActive) {
        return "Draft";
    }

    if (stock <= 0) {
        return "Out of Stock";
    }

    if (stock <= LOW_STOCK_THRESHOLD) {
        return "Low Stock";
    }

    return "Active";
}

export function getInventoryStatus({ stock }) {
    if (stock <= 0) {
        return "Out of Stock";
    }

    if (stock <= LOW_STOCK_THRESHOLD) {
        return "Low Stock";
    }

    return "Healthy";
}

export function formatProduct(row, { images = [], variants = [] } = {}) {
    const sortedImages = [...images].sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
    );

    const imageUrls = sortedImages.length
        ? sortedImages.map((image) => image.image_url)
        : row.image
          ? [row.image]
          : [];

    const primaryImage =
        sortedImages.find((image) => image.is_primary)?.image_url ||
        row.image ||
        imageUrls[0] ||
        null;

    const sizes = [
        ...new Set(variants.map((variant) => variant.size).filter(Boolean)),
    ].sort((a, b) => Number(a) - Number(b));

    const colors = [
        ...new Set(variants.map((variant) => variant.color).filter(Boolean)),
    ];

    const stock = Number(row.stock) || 0;

    const formatted = {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        price: Number(row.price),
        oldPrice: row.old_price != null ? Number(row.old_price) : null,
        image: primaryImage,
        images: imageUrls,
        alt: row.alt || row.alt_text || row.name,
        brand: row.brand || null,
        sku: row.sku || null,
        category: row.category,
        categoryId: row.category_id,
        stock,
        inStock: Boolean(row.in_stock),
        isActive: Boolean(row.is_active),
        featured: Boolean(row.featured),
        rating: Number(row.rating) || 0,
        reviews: Number(row.reviews) || 0,
        sizes,
        colors,
        variants: variants.map((variant) => ({
            id: variant.id,
            size: variant.size,
            color: variant.color,
            stock: Number(variant.stock) || 0,
        })),
    };

    return {
        ...formatted,
        status: getProductStatus(formatted),
        inventoryStatus: getInventoryStatus(formatted),
    };
}

async function loadProductRelations(productIds) {
    if (!productIds.length) {
        return { imagesByProduct: new Map(), variantsByProduct: new Map() };
    }

    const [imagesResult, variantsResult] = await Promise.all([
        pool.query(
            `SELECT id, product_id, image_url, alt_text, is_primary, display_order
             FROM product_images
             WHERE product_id = ANY($1::int[])
             ORDER BY display_order ASC, id ASC`,
            [productIds],
        ),
        pool.query(
            `SELECT id, product_id, size, color, stock
             FROM product_variants
             WHERE product_id = ANY($1::int[])
             ORDER BY size ASC, color ASC`,
            [productIds],
        ),
    ]);

    const imagesByProduct = new Map();
    const variantsByProduct = new Map();

    for (const image of imagesResult.rows) {
        const list = imagesByProduct.get(image.product_id) || [];
        list.push(image);
        imagesByProduct.set(image.product_id, list);
    }

    for (const variant of variantsResult.rows) {
        const list = variantsByProduct.get(variant.product_id) || [];
        list.push(variant);
        variantsByProduct.set(variant.product_id, list);
    }

    return { imagesByProduct, variantsByProduct };
}

function buildProductQuery({ includeInactive = false, featured = false } = {}) {
    const conditions = [];

    if (!includeInactive) {
        conditions.push("p.is_active = true");
    }

    if (featured) {
        conditions.push("p.featured = true");
    }

    const whereClause = conditions.length
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    return {
        text: `
            SELECT
                p.id,
                p.category_id,
                p.name,
                p.slug,
                p.description,
                p.price,
                p.old_price,
                p.stock,
                p.alt_text,
                p.is_active,
                p.featured,
                p.image,
                p.alt,
                p.rating,
                p.reviews,
                p.in_stock,
                p.brand,
                p.sku,
                c.name AS category
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ${whereClause}
            ORDER BY p.id ASC
        `,
    };
}

export async function getProducts(options = {}) {
    const result = await pool.query(buildProductQuery(options));
    const productIds = result.rows.map((row) => row.id);
    const { imagesByProduct, variantsByProduct } =
        await loadProductRelations(productIds);

    return result.rows.map((row) =>
        formatProduct(row, {
            images: imagesByProduct.get(row.id) || [],
            variants: variantsByProduct.get(row.id) || [],
        }),
    );
}

export async function getProductBySlug(slug, { includeInactive = false } = {}) {
    const conditions = ["p.slug = $1"];
    const values = [slug];

    if (!includeInactive) {
        conditions.push("p.is_active = true");
    }

    const result = await pool.query(
        `
            SELECT
                p.id,
                p.category_id,
                p.name,
                p.slug,
                p.description,
                p.price,
                p.old_price,
                p.stock,
                p.alt_text,
                p.is_active,
                p.featured,
                p.image,
                p.alt,
                p.rating,
                p.reviews,
                p.in_stock,
                p.brand,
                p.sku,
                c.name AS category
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE ${conditions.join(" AND ")}
            LIMIT 1
        `,
        values,
    );

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    const { imagesByProduct, variantsByProduct } = await loadProductRelations([
        row.id,
    ]);

    return formatProduct(row, {
        images: imagesByProduct.get(row.id) || [],
        variants: variantsByProduct.get(row.id) || [],
    });
}

export function resolvePrimaryImage(images, fallbackAlt) {
    const validImages = images.filter((image) => image.imageUrl);

    if (!validImages.length) {
        return null;
    }

    const primary =
        validImages.find((image) => image.isPrimary) || validImages[0];

    return {
        ...primary,
        altText: primary.altText?.trim() || fallbackAlt,
    };
}

export function normalizeImagesForInsert(images, fallbackAlt) {
    const validImages = images.filter((image) => image.imageUrl);

    if (!validImages.length) {
        return [];
    }

    const primary = resolvePrimaryImage(validImages, fallbackAlt);

    return validImages.map((image, index) => ({
        imageUrl: image.imageUrl,
        altText: image.altText?.trim() || fallbackAlt,
        isPrimary: image.imageUrl === primary.imageUrl,
        displayOrder:
            typeof image.displayOrder === "number" ? image.displayOrder : index,
    }));
}
