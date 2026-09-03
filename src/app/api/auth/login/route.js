import { createToken } from "@/lib/auth";
import pool from "@/lib/db";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { email, password, remember } = await request.json()
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password required" },
                { status: 400 }
            )
        }
        const normalizedEmail = email
            .trim()
            .toLowerCase();

        const result = await pool.query(
            `SELECT id, name, email, password, phone, role, created_at FROM users WHERE email = $1`, [normalizedEmail]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const user = result.rows[0]
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            )
        }

        const token = createToken(user)
        const response = NextResponse.json({
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                created_at: user.created_at || null,
            },
        })

        response.cookies.set("auth_token", token,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "lax",
                maxAge: remember
                    ? 60 * 60 * 24 * 30
                    : 60 * 60 * 24,
                path: "/",
            }
        )
        return response
    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        return NextResponse.json(
            {
                message: "Unable to login.",
            },
            {
                status: 500,
            }
        );
    }
}