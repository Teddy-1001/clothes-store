"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* HEADER */}
            <section className="border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                        Shop
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        All Products
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
                        Explore our latest collection of footwear and
                        everyday essentials.
                    </p>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div
                                key={item}
                                className="h-[420px] animate-pulse rounded-2xl bg-gray-100"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="py-20 text-center">
                        <p className="text-sm text-gray-500">
                            {error}
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-sm text-gray-500">
                            No products available.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
