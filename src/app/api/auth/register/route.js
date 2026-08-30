import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";

export async function POST(request) {
    try {
        const {
            name,
            email,
            password,
            phone,
        } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email and password are required." },
                { status: 400, }
            )
        }

        if (password.length < 8) {
            return NextResponse.json({
                message: "Password must be at least 8 characters.",
            },
                {
                    status: 400
                }
            )
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [normalizedEmail])

        if (existingUser.rows.length > 0) {
            return NextResponse.json(
                {
                    message:
                        "An account with this email already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 15)

        const result = await pool.query(`INSERT INTO users(name, email, password, phone) VALUES($1,$2,$3,$4) RETURNING id, name, email, phone, role`, [name.trim(), normalizedEmail, hashedPassword, phone || null])

        const user = result.rows[0]
        const token = createToken(user)

        const response = NextResponse.json(
            { message: "Account created successfully", user },
            { status: 201 }
        )

        response.cookies.set("auth_token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
            }
        )

        return response

    } catch (error) {
        console.error(
            "REGISTER ERROR:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to create account.",
            },
            {
                status: 500,
            }
        )
    }
}