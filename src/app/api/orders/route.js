import { getOrders } from "@/lib/orders";
import { requireManager } from "@/lib/require-manager";
import { NextResponse } from "next/server";

export async function GET() {
    const auth = await requireManager();
    if (auth.response) {
        return auth.response;
    }

    try {
        const orders = await getOrders();

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Failed to fetch orders:", error);

        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 },
        );
    }
}
