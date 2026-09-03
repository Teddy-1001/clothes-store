import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";

import pool from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/login?error=google_cancelled", request.url)
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const redirectUrl = `${baseUrl}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      throw new Error("Google OAuth environment variables are missing.");
    }

    const client = new OAuth2Client(
      clientId,
      clientSecret,
      redirectUrl
    );

    // Exchange authorization code for Google tokens
    const { tokens } = await client.getToken(code);

    if (!tokens?.id_token) {
      throw new Error("Failed to retrieve ID token from Google.");
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Failed to retrieve user information from Google.");
    }

    const googleId = payload.sub;
    const email = payload.email?.trim().toLowerCase();
    const name = payload.name || "Google User";

    if (!googleId || !email) {
      throw new Error("Google ID or email is missing.");
    }

    // --------------------------------------------------
    // 1. Check if this Google account already exists
    // --------------------------------------------------

    let result = await pool.query(
      `
      SELECT id, name, email, phone, role, created_at
      FROM users
      WHERE google_id = $1
      `,
      [googleId]
    );

    let user;

    if (result.rows.length > 0) {
      user = result.rows[0];
    } else {
      // --------------------------------------------------
      // 2. Check if an account already exists with email
      // --------------------------------------------------

      result = await pool.query(
        `
        SELECT id, name, email, phone, role, created_at
        FROM users
        WHERE LOWER(email) = $1
        `,
        [email]
      );

      if (result.rows.length > 0) {
        // Existing email account
        user = result.rows[0];

        await pool.query(
          `
          UPDATE users
          SET google_id = $1,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
          `,
          [googleId, user.id]
        );

        user.google_id = googleId;
      } else {
        // --------------------------------------------------
        // 3. Create a new customer account
        // --------------------------------------------------

        const randomPassword = crypto
          .randomBytes(16)
          .toString("hex");

        const hashedPassword = await bcrypt.hash(
          randomPassword,
          15
        );

        const newUser = await pool.query(
          `
          INSERT INTO users
          (name, email, password, role, google_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, name, email, phone, role, created_at
          `,
          [
            name,
            email,
            hashedPassword,
            "customer",
            googleId,
          ]
        );

        user = newUser.rows[0];
      }
    }

    // --------------------------------------------------
    // 4. Create your normal JWT
    // --------------------------------------------------

    const token = createToken(user);

    // --------------------------------------------------
    // 5. Redirect to account page
    // --------------------------------------------------

    const response = NextResponse.redirect(
      new URL("/account", request.url)
    );

    // Same authentication cookie used by normal login
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return NextResponse.redirect(
      new URL("/login?error=google_failed", request.url)
    );
  }
}