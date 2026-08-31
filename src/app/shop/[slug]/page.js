import AnnouncmentBanner from "@/components/AnnouncmentBanner";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <AnnouncmentBanner />
            <Header />
            <ProductDetails product={product} />
        </div>
    );
}
