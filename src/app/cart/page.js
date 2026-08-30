"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    // Temporary cart data
    const { cart,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart, } = useCart()

    // const subtotal = cartItems.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0
    // );

    const shipping = subtotal >= 10000 ? 0 : 300;

    const total = subtotal + shipping;

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">
            <Header />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Shopping Bag
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-6">

                        <div>
                            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
                                Your Cart
                            </h1>

                            <p className="mt-5 text-sm text-gray-500">
                                {cartCount} {cartCount === 1 ? "item" : "items"} ready for you.
                            </p>
                        </div>

                        <Link
                            href="/shop/shoes"
                            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-gray-900 sm:flex"
                        >
                            <ArrowLeft size={14} />
                            Continue Shopping
                        </Link>

                    </div>
                </div>
            </section>


            {/* Cart */}
            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

                    {/* Items */}
                    <div>
                        {cart.length === 0 ? (
                            <div className="flex min-h-[400px] flex-col items-center justify-center border-y border-gray-200 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <ShoppingBag
                                        size={24}
                                        strokeWidth={1.5}
                                        className="text-gray-400"
                                    />
                                </div>

                                <h2 className="mt-6 text-2xl font-semibold">
                                    Your cart is empty
                                </h2>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                                    Looks like you haven't added any shoes yet.
                                    Discover something you'll love.
                                </p>

                                <Link
                                    href="/shop"
                                    className="group mt-7 inline-flex items-center gap-3 rounded-full bg-gray-900 px-7 py-4 text-sm font-semibold text-white transition hover:bg-black"
                                >
                                    Start Shopping
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        ) : (

                            <div className="divide-y divide-gray-200 border-y border-gray-200">

                                {cart.map((item) => (

                                    <article
                                        key={item.id}
                                        className="flex gap-5 py-7 sm:gap-7"
                                    >

                                        {/* Product Image */}
                                        <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-40 sm:w-32">

                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition duration-500 hover:scale-105"
                                            />

                                        </div>


                                        {/* Details */}
                                        <div className="flex min-w-0 flex-1 flex-col justify-between">

                                            <div className="flex justify-between gap-4">

                                                <div>

                                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                                        {item.category}
                                                    </p>

                                                    <h2 className="mt-2 text-lg font-semibold">
                                                        {item.name}
                                                    </h2>

                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Size {item.size} · {item.color}
                                                    </p>

                                                </div>

                                                <p className="text-sm font-semibold">
                                                    KSh {item.price.toLocaleString()}
                                                </p>

                                            </div>


                                            {/* Bottom controls */}
                                            <div className="mt-6 flex items-center justify-between">

                                                {/* Quantity */}
                                                <div className="flex items-center rounded-full border border-gray-200 bg-white">

                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:text-gray-900"
                                                    >
                                                        <Minus size={13} />
                                                    </button>

                                                    <span className="w-8 text-center text-xs font-medium">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:text-gray-900"
                                                    >
                                                        <Plus size={13} />
                                                    </button>

                                                </div>


                                                {/* Remove */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-2 text-xs text-gray-400 transition hover:text-red-500"
                                                >
                                                    <Trash2 size={14} />
                                                    <span className="hidden sm:block">
                                                        Remove
                                                    </span>
                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>
                        )}

                    </div>


                    {/* Summary */}
                    <aside className="h-fit rounded-3xl bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.05)] sm:p-8">

                        <h2 className="text-lg font-semibold">
                            Order Summary
                        </h2>

                        <div className="mt-8 space-y-5 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    KSh {subtotal.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span className="font-medium">
                                    {shipping === 0
                                        ? "Free"
                                        : `KSh ${shipping.toLocaleString()}`}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-5">

                                <div className="flex justify-between">

                                    <span className="font-semibold">
                                        Total
                                    </span>

                                    <span className="text-xl font-semibold">
                                        KSh {total.toLocaleString()}
                                    </span>

                                </div>

                            </div>

                        </div>


                        <Link
                            href="/checkout"
                            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gray-900 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-black"
                        >
                            Proceed to Checkout

                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>


                        <p className="mt-5 text-center text-[10px] leading-5 text-gray-400">
                            Free shipping on orders over KSh 10,000
                        </p>

                    </aside>

                </div>

            </section>

        </main>
    );
}