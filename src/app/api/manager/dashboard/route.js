import { getManagerDashboard } from "@/lib/orders";
import { requireManager } from "@/lib/require-manager";
import { NextResponse } from "next/server";

export async function GET() {
    const auth = await requireManager();
    if (auth.response) {
        return auth.response;
    }

    try {
        const dashboard = await getManagerDashboard();

        return NextResponse.json(dashboard);
    } catch (error) {
        console.error("Failed to fetch manager dashboard:", error);

        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 },
        );
    }
}
