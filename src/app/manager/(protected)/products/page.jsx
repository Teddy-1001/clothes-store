"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Plus,
    Search,
    MoreHorizontal,
    Package,
} from "lucide-react";
import Loading from "@/components/Loading";

function statusStyles(status) {
    switch (status) {
        case "Active":
            return "bg-green-50 text-green-600";
        case "Low Stock":
            return "bg-orange-50 text-orange-600";
        case "Draft":
            return "bg-gray-100 text-gray-600";
        default:
            return "bg-red-50 text-red-600";
    }
}

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?manage=true");

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
        }

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const query = search.toLowerCase();

        return (
            product.name.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query) ||
            product.sku?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query)
        );
    });


    return (
        <div>
            <header className="border-b border-black/10 bg-white">
                <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                            Catalog
                        </p>

                        <h1 className="mt-1 text-2xl font-semibold">
                            Products
                        </h1>
                    </div>

                    <Link
                        href="/manager/products/new"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#111] px-4 py-3 text-sm font-medium text-white"
                    >
                        <Plus size={17} />
                        Add Product
                    </Link>
                </div>
            </header>

            <div className="p-6 lg:p-10">
                <div className="rounded-2xl border border-black/10 bg-white">
                    <div className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full rounded-xl border border-black/10 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
                            />
                        </div>

                        <p className="text-sm text-gray-500">
                            {filteredProducts.length} products
                        </p>
                    </div>

                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <div className="p-10 text-center text-sm text-red-500">
                            {error}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="p-10 text-center text-sm text-gray-500">
                            {products.length === 0
                                ? "No products yet."
                                : "No products match your search."}
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">
                                    <thead className="border-b border-black/10 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                        <tr>
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4">Brand</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4">Stock</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-black/10">
                                        {filteredProducts.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                                                            {product.image ? (
                                                                <Image
                                                                    src={product.image}
                                                                    alt={product.alt}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <Package
                                                                    size={20}
                                                                    className="text-gray-400"
                                                                />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {product.name}
                                                            </p>
                                                            {product.sku && (
                                                                <p className="mt-0.5 text-xs text-gray-400">
                                                                    {product.sku}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-500">
                                                    <p>{product.brand || "—"}</p>
                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        {product.category}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5 text-sm font-medium">
                                                    KSh{" "}
                                                    {product.price.toLocaleString()}
                                                </td>

                                                <td className="px-6 py-5 text-sm">
                                                    {product.stock}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles(product.status)}`}
                                                    >
                                                        {product.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <button className="rounded-lg p-2 hover:bg-gray-100">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-black/10 md:hidden">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="p-5">
                                        <div className="flex gap-4">
                                            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                                                {product.image ? (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.alt}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Package
                                                        size={22}
                                                        className="text-gray-400"
                                                    />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            {product.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {[
                                                                product.brand,
                                                                product.sku,
                                                                product.category,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(" · ")}
                                                        </p>
                                                    </div>

                                                    <button className="h-fit rounded-lg p-2 hover:bg-gray-100">
                                                        <MoreHorizontal size={17} />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <p className="text-sm font-semibold">
                                                        KSh{" "}
                                                        {product.price.toLocaleString()}
                                                    </p>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles(product.status)}`}
                                                    >
                                                        {product.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
