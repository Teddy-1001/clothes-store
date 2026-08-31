import { getProductBySlug } from "@/lib/products";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
        const { searchParams } = new URL(request.url);
        const includeInactive = searchParams.get("manage") === "true";

        const product = await getProductBySlug(slug, { includeInactive });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Failed to fetch product:", error);

        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 },
        );
    }
}
