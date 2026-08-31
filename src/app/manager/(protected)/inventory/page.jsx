"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    Boxes,
    PackageCheck,
    Plus,
} from "lucide-react";

function inventoryStatusStyles(status) {
    switch (status) {
        case "Healthy":
            return "bg-green-50 text-green-600";
        case "Low Stock":
            return "bg-orange-50 text-orange-600";
        default:
            return "bg-red-50 text-red-600";
    }
}

export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?manage=true");

                if (!response.ok) {
                    throw new Error("Failed to fetch inventory");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const stats = useMemo(() => {
        const totalItems = products.reduce(
            (total, product) => total + product.stock,
            0,
        );
        const lowStock = products.filter(
            (product) => product.inventoryStatus === "Low Stock",
        ).length;
        const outOfStock = products.filter(
            (product) => product.inventoryStatus === "Out of Stock",
        ).length;

        return { totalItems, lowStock, outOfStock };
    }, [products]);

    return (
        <div>
            <header className="border-b border-black/10 bg-white">
                <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                            Stock Management
                        </p>

                        <h1 className="mt-1 text-2xl font-semibold">
                            Inventory
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

            <div className="space-y-6 p-6 lg:p-10">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                            <Boxes size={19} />
                        </div>

                        <p className="mt-5 text-sm text-gray-500">
                            Total Units
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                            {stats.totalItems.toLocaleString()}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                            <AlertTriangle size={19} />
                        </div>

                        <p className="mt-5 text-sm text-orange-700">
                            Low Stock
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                            {stats.lowStock}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                            <PackageCheck size={19} />
                        </div>

                        <p className="mt-5 text-sm text-red-700">
                            Out of Stock
                        </p>

                        <p className="mt-1 text-2xl font-semibold">
                            {stats.outOfStock}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white">
                    <div className="border-b border-black/10 px-6 py-5">
                        <h2 className="font-semibold">
                            Current Inventory
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Monitor your product stock levels
                        </p>
                    </div>

                    {loading ? (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            Loading inventory...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="px-6 py-10 text-center text-sm text-gray-500">
                            No products in inventory yet.
                        </div>
                    ) : (
                        <div className="divide-y divide-black/10">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {product.name}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {product.sku
                                                ? `SKU: ${product.sku}`
                                                : null}
                                            {product.sku && product.category
                                                ? " · "
                                                : null}
                                            {product.category}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Stock
                                            </p>

                                            <p className="mt-1 text-sm font-semibold">
                                                {product.stock} units
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${inventoryStatusStyles(product.inventoryStatus)}`}
                                        >
                                            {product.inventoryStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
