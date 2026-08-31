import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await pool.query(
            `SELECT id, name FROM categories ORDER BY name ASC`,
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch categories:", error);

        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 },
        );
    }
}
