import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sessionUser = await getCurrentUser()
        if (!sessionUser) {
            return NextResponse.json(
                { user: null },
                { status: 401 }
            )
        }

        const result = await pool.query(
            `SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1`, [sessionUser.id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                {
                    user: null,
                },
                {
                    status: 401,
                }
            );
        }

        return NextResponse.json({
            user: result.rows[0],
        })
    } catch (error) {
        console.error(
            "ME ERROR:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to get current user.",
            },
            {
                status: 500,
            }
        );
    }
}