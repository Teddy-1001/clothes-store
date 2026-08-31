"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Image from "next/image";
import Loading from "@/components/Loading";

const categories = [
    "All",
    "Heels",
    "Pumps",
    "Flats",
    "Sneakers",
    "Boots",
];

export default function ShoesPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products")
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error(error);
                setError("Unable to load products.");
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-20">
                <p className="text-sm text-red-500">
                    {error}
                </p>
            </main>
        );
    }


    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter(
                (product) => product.category === activeCategory
            );

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Page Header */}
            <section className="border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">

                    {/* Breadcrumb */}
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Shop / Shoes
                    </p>

                    <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 md:text-7xl">
                                All Shoes
                            </h1>

                            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500">
                                Discover footwear designed to complement
                                your style, from everyday essentials to
                                statement pieces.
                            </p>
                        </div>

                        <p className="text-sm text-gray-400">
                            {filteredProducts.length}{" "}
                            {filteredProducts.length === 1
                                ? "product"
                                : "products"}
                        </p>

                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-20 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

                    {/* Categories */}
                    <div className="flex min-w-0 gap-2 overflow-x-auto scrollbar-hide">

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`
                                    shrink-0 rounded-full px-4 py-2
                                    text-xs font-medium
                                    transition-all duration-300
                                    ${activeCategory === category
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                    }
                                `}
                            >
                                {category}
                            </button>
                        ))}

                    </div>

                    {/* Sort */}
                    <button
                        type="button"
                        className="
                            hidden shrink-0 items-center gap-2
                            rounded-full border border-gray-200
                            px-4 py-2.5
                            text-xs font-medium text-gray-700
                            transition hover:border-gray-900
                            sm:flex
                        "
                    >
                        <SlidersHorizontal size={14} strokeWidth={1.7} />
                        Filter
                        <ChevronDown size={14} strokeWidth={1.7} />
                    </button>

                </div>
            </section>

            {/* Products */}
            <section className="mx-auto px-6 py-12 md:py-16">

                {filteredProducts.length > 0 ? (
                    <div className="
                        grid
                        grid-cols-2
                        gap-x-4 gap-y-12
                        sm:gap-x-6
                        md:grid-cols-3
                        lg:grid-cols-4
                        lg:gap-x-7
                        lg:gap-y-16
                    ">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-[400px] items-center justify-center text-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                No shoes found
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Try selecting another category.
                            </p>
                        </div>
                    </div>
                )}

            </section>

        </main>
    );
}