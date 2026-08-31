import { getCurrentUser, getManagerUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireManager() {
    const user = await getManagerUser();

    if (user) {
        return { user, response: null };
    }

    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
        return {
            user: null,
            response: NextResponse.json(
                { message: "Authentication required" },
                { status: 401 },
            ),
        };
    }

    return {
        user: null,
        response: NextResponse.json(
            { message: "Manager access required" },
            { status: 403 },
        ),
    };
}
