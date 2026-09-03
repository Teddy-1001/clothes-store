import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const redirectUrl = `${baseUrl}/api/auth/google/callback`;

    if(!clientId) {
        return NextResponse.json(
            { message: "Google client ID is not configured." },
            { status: 500 }
        );
    }

    const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleUrl.searchParams.set("client_id", clientId);
    googleUrl.searchParams.set("redirect_uri", redirectUrl);
    googleUrl.searchParams.set("response_type", "code");
    googleUrl.searchParams.set("scope", "openid email profile");
    googleUrl.searchParams.set("access_type", "offline");
    googleUrl.searchParams.set("prompt", "select_account");

    return NextResponse.redirect(googleUrl.toString());
}