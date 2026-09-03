import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and new password are required",
        },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    // Hash the token
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find valid token
    const result = await pool.query(
      `
        SELECT id, user_id
        FROM password_reset_tokens
        WHERE token_hash = $1
          AND expires_at > CURRENT_TIMESTAMP
      `,
      [tokenHash]
    );

    // Token doesn't exist or has expired
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 400 }
      );
    }

    const resetToken = result.rows[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 15);

    // Update user's password
    await pool.query(
      `
        UPDATE users
        SET password = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `,
      [hashedPassword, resetToken.user_id]
    );

    // Delete the token so it cannot be reused
    await pool.query(
      `
        DELETE FROM password_reset_tokens
        WHERE id = $1
      `,
      [resetToken.id]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Password has been reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}