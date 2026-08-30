import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.slug,
                p.price,
                p.old_price,
                p.image,
                p.alt,
                p.description,
                p.rating,
                p.reviews,
                p.in_stock,
                p.featured,

                c.name AS category

            FROM products p
            LEFT JOIN categories c
                ON p.category_id = c.id

            ORDER BY p.id ASC
        `);

        return NextResponse.json(result.rows)
    } catch (error) {
        console.error("Failed to fetch products:", error);

        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}