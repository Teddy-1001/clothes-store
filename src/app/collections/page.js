"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import CollectionCard from "@/components/CollectionCard";

const collectionDetails = [
    {
        name: "Running Shoes",
        image: "/images/running-shoes.jpg",
        alt: "Running Shoes collection",
        href: "/collections/running-shoes",
    },
    {
        name: "Casual Shoes",
        image: "/images/casual-shoes.jpg",
        alt: "Casual Shoes collection",
        href: "/collections/casual-shoes",
    },
    {
        name: "Slides & Sandals",
        image: "/images/slides-sandals.jpg",
        alt: "Slides and Sandals collection",
        href: "/collections/slides-sandals",
    },
    {
        name: "Boots",
        image: "/images/boots.jpg",
        alt: "Boots collection",
        href: "/collections/boots",
    },
];

export default function CollectionsPage() {
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
                setError("Unable to load collections.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getProductCount = (collectionName) => {
        return products.filter(
            (product) =>
                product.category?.toLowerCase() ===
                collectionName.toLowerCase()
        ).length;
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#f5f5f3]">
                <div className="mx-auto flex min-h-[55vh] max-w-7xl items-center px-6 py-20 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                            Our Collections
                        </p>

                        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                            Find your
                            <br />
                            <span className="text-gray-400">
                                everyday style.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                            Explore our carefully curated collections and
                            discover styles designed for every mood, moment,
                            and occasion.
                        </p>

                        <Link
                            href="#collections"
                            className="mt-8 inline-flex items-center gap-3 bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Explore Collections
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="absolute bottom-8 right-8 hidden lg:block">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/20">
                            <ArrowDown
                                size={18}
                                className="animate-bounce"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* COLLECTIONS */}
            <section
                id="collections"
                className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
            >
                <div className="mb-12 flex items-end justify-between gap-8">
                    <div>
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
                            Shop by style
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Explore our collections
                        </h2>
                    </div>

                    <p className="hidden max-w-md text-right text-sm leading-6 text-gray-500 md:block">
                        Discover thoughtfully selected styles, from everyday
                        essentials to pieces that make a statement.
                    </p>
                </div>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {collectionDetails.map((collection) => (
                            <div
                                key={collection.name}
                                className="h-[420px] animate-pulse rounded-3xl bg-gray-100"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="py-20 text-center">
                        <p className="text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 bg-black px-6 py-3 text-sm font-medium text-white"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {collectionDetails.map((collection) => (
                            <CollectionCard
                                key={collection.name}
                                collectionImg={collection.image}
                                collectionAlt={collection.alt}
                                collectionName={collection.name}
                                collectionHref={collection.href}
                                productCount={getProductCount(
                                    collection.name
                                )}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* BRAND MESSAGE */}
            <section className="border-y border-gray-200 bg-[#fafafa]">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
                                Curated for you
                            </p>

                            <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                                Style that feels as good as it looks.
                            </h2>
                        </div>

                        <div className="max-w-xl lg:ml-auto">
                            <p className="text-sm leading-7 text-gray-500 sm:text-base">
                                We believe great style should be effortless.
                                Every collection is carefully selected to give
                                you versatile pieces that you can wear,
                                combine, and make your own.
                            </p>

                            <Link
                                href="/shop"
                                className="mt-7 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-8 transition hover:opacity-60"
                            >
                                Shop all products
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black text-white">
                <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                        Discover more
                    </p>

                    <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                        Your next favorite piece is waiting.
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/60">
                        Explore our latest arrivals and timeless essentials.
                    </p>

                    <Link
                        href="/shop"
                        className="mt-8 inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                        Shop Now
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </main>
    );
}