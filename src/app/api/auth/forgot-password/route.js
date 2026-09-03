import crypto from "crypto";
import { NextResponse } from "next/server";

import pool from "@/lib/db";
import transporter from "@/lib/mailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const result = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE LOWER(email) = $1`,
      [normalizedEmail]
    );

    /*
     * Always return the same message when the email
     * does not exist. This prevents email enumeration.
     */
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account exists with that email, a reset link has been sent.",
        },
        { status: 200 }
      );
    }

    const user = result.rows[0];

    // Delete previous reset tokens
    await pool.query(
      `DELETE FROM password_reset_tokens
       WHERE user_id = $1`,
      [user.id]
    );

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing it in the database
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    // Store hashed token
    await pool.query(
      `INSERT INTO password_reset_tokens
       (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, tokenHash, expiresAt]
    );

    // Application URL
    const appUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Reset URL sent to the user
    const resetLink =
      `${appUrl}/reset-password?token=${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: `"Masangla Wears" <${process.env.GMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Password Reset Request",

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            font-family: Arial, sans-serif;
          "
        >

          <div
            style="
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              padding: 40px 30px;
              border-radius: 12px;
            "
          >

            <h1
              style="
                margin: 0 0 20px;
                font-size: 28px;
                color: #111111;
              "
            >
              Reset Your Password
            </h1>

            <p
              style="
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              Hi ${user.name},
            </p>

            <p
              style="
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              We received a request to reset the password
              for your Masangla Wears account.
            </p>

            <p
              style="
                color: #555555;
                font-size: 16px;
                line-height: 1.6;
              "
            >
              Click the button below to create a new password.
            </p>

            <div
              style="
                text-align: center;
                margin: 30px 0;
              "
            >
              <a
                href="${resetLink}"
                style="
                  display: inline-block;
                  background: #111111;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 14px 28px;
                  border-radius: 8px;
                  font-size: 15px;
                  font-weight: bold;
                "
              >
                Reset Password
              </a>
            </div>

            <p
              style="
                color: #777777;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              This link will expire in 30 minutes.
            </p>

            <p
              style="
                color: #777777;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              If you did not request a password reset,
              you can safely ignore this email.
            </p>

            <hr
              style="
                border: 0;
                border-top: 1px solid #eeeeee;
                margin: 30px 0;
              "
            />

            <p
              style="
                color: #999999;
                font-size: 13px;
              "
            >
              Masangla Wears
            </p>

          </div>

        </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with that email, a reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}