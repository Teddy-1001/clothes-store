"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ShoppingBag,
    Trash2,
    X,
} from "lucide-react";

import Header from "@/components/Header";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";

export default function ComparePage() {
    const {
        compare,
        removeFromCompare,
        clearCompare,
    } = useCompare();

    const { addToCart } = useCart();

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">
            <Header />

            {/* =====================================================
                HEADER
            ====================================================== */}

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Continue Shopping
                    </Link>

                    <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Product Comparison
                            </p>

                            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                                Compare
                            </h1>

                            <p className="mt-5 text-sm text-gray-500">
                                Compare your favourite shoes side by side.
                            </p>
                        </div>

                        {compare.length > 0 && (
                            <button
                                type="button"
                                onClick={clearCompare}
                                className="flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-red-500"
                            >
                                <Trash2 size={14} />
                                Clear All
                            </button>
                        )}

                    </div>

                </div>
            </section>

            {/* =====================================================
                EMPTY STATE
            ====================================================== */}

            {compare.length === 0 ? (
                <EmptyCompare />
            ) : (
                <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                    {/* Desktop comparison */}

                    <div className="hidden overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.04)] md:block">

                        {/* Product header */}

                        <div
                            className="grid"
                            style={{
                                gridTemplateColumns: `220px repeat(${compare.length}, minmax(220px, 1fr))`,
                            }}
                        >

                            <div className="border-b border-gray-100 p-7">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                    Products
                                </span>
                            </div>

                            {compare.map((product) => (
                                <ProductColumn
                                    key={product.id}
                                    product={product}
                                    onRemove={() =>
                                        removeFromCompare(product.id)
                                    }
                                    onAdd={() =>
                                        addToCart(product)
                                    }
                                />
                            ))}

                        </div>

                        {/* Comparison rows */}

                        <CompareRow
                            label="Category"
                            products={compare}
                            render={(product) => (
                                <span className="text-xs text-gray-500">
                                    {product.category || "—"}
                                </span>
                            )}
                        />

                        <CompareRow
                            label="Price"
                            products={compare}
                            render={(product) => (
                                <span className="text-sm font-semibold">
                                    KSh{" "}
                                    {Number(product.price || 0).toLocaleString()}
                                </span>
                            )}
                        />

                        <CompareRow
                            label="Size"
                            products={compare}
                            render={(product) => (
                                <span className="text-xs text-gray-500">
                                    {product.size || "Multiple sizes"}
                                </span>
                            )}
                        />

                        <CompareRow
                            label="Color"
                            products={compare}
                            render={(product) => (
                                <span className="text-xs text-gray-500">
                                    {product.color || "Multiple colours"}
                                </span>
                            )}
                        />

                        <CompareRow
                            label="Availability"
                            products={compare}
                            render={(product) => (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
                                    <Check size={13} />
                                    Available
                                </span>
                            )}
                        />

                        <CompareRow
                            label="Action"
                            products={compare}
                            render={(product) => (
                                <button
                                    type="button"
                                    onClick={() => addToCart(product)}
                                    className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black"
                                >
                                    Add to Bag

                                    <ArrowRight
                                        size={13}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>
                            )}
                        />

                    </div>

                    {/* Mobile comparison */}

                    <div className="space-y-5 md:hidden">

                        {compare.map((product) => (
                            <MobileProduct
                                key={product.id}
                                product={product}
                                onRemove={() =>
                                    removeFromCompare(product.id)
                                }
                                onAdd={() =>
                                    addToCart(product)
                                }
                            />
                        ))}

                    </div>

                </section>
            )}
        </main>
    );
}


/* =========================================================
   PRODUCT COLUMN
========================================================= */

function ProductColumn({
    product,
    onRemove,
    onAdd,
}) {
    return (
        <div className="relative border-b border-l border-gray-100 p-6">

            <button
                type="button"
                onClick={onRemove}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
            >
                <X size={14} />
            </button>

            <div className="relative mx-auto aspect-square max-w-[190px] overflow-hidden rounded-[24px] bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="mt-5">

                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {product.category || "Footwear"}
                </p>

                <h2 className="mt-2 text-sm font-semibold">
                    {product.name}
                </h2>

                <p className="mt-2 text-sm font-semibold">
                    KSh {Number(product.price || 0).toLocaleString()}
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   COMPARISON ROW
========================================================= */

function CompareRow({
    label,
    products,
    render,
}) {
    return (
        <div
            className="grid border-b border-gray-100 last:border-b-0"
            style={{
                gridTemplateColumns: `220px repeat(${products.length}, minmax(220px, 1fr))`,
            }}
        >

            <div className="flex items-center bg-gray-50/70 px-7 py-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    {label}
                </span>
            </div>

            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center border-l border-gray-100 px-6 py-6"
                >
                    {render(product)}
                </div>
            ))}

        </div>
    );
}


/* =========================================================
   MOBILE PRODUCT
========================================================= */

function MobileProduct({
    product,
    onRemove,
    onAdd,
}) {
    return (
        <article className="rounded-[28px] border border-gray-200 bg-white p-5">

            <div className="flex gap-5">

                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex justify-between gap-3">

                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                {product.category || "Footwear"}
                            </p>

                            <h2 className="mt-1 text-sm font-semibold">
                                {product.name}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onRemove}
                            className="text-gray-300 transition-colors hover:text-red-500"
                        >
                            <X size={15} />
                        </button>

                    </div>

                    <p className="mt-3 text-sm font-semibold">
                        KSh{" "}
                        {Number(product.price || 0).toLocaleString()}
                    </p>

                </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">

                <MobileInfo
                    label="Size"
                    value={product.size || "Multiple"}
                />

                <MobileInfo
                    label="Color"
                    value={product.color || "Multiple"}
                />

            </div>

            <button
                type="button"
                onClick={onAdd}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-black"
            >
                <ShoppingBag size={14} />
                Add to Bag
            </button>

        </article>
    );
}


/* =========================================================
   MOBILE INFO
========================================================= */

function MobileInfo({
    label,
    value,
}) {
    return (
        <div className="rounded-2xl bg-gray-50 p-4">

            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-xs font-medium text-gray-700">
                {value}
            </p>

        </div>
    );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyCompare() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

            <div className="flex min-h-[450px] flex-col items-center justify-center rounded-[32px] border border-gray-200 bg-white px-6 text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <ShoppingBag
                        size={27}
                        strokeWidth={1.2}
                    />
                </div>

                <h2 className="mt-7 text-2xl font-semibold tracking-tight">
                    Nothing to compare
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                    Add a few shoes to your comparison list and
                    see their differences side by side.
                </p>

                <Link
                    href="/shop"
                    className="group mt-8 flex items-center gap-2 rounded-full bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black"
                >
                    Explore Shoes

                    <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>

            </div>

        </section>
    );
}