
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CreditCard,
    Lock,
    MapPin,
    Package,
    Truck,
} from "lucide-react";

import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const {
        cart,
        subtotal,
        cartCount,
    } = useCart();

    const shipping = subtotal >= 5000 ? 0 : 300;
    const total = subtotal + shipping;

    if (!cart || cart.length === 0) {
        return (
            <main className="min-h-screen bg-white">
                <Header />

                <section className="flex min-h-[70vh] items-center justify-center px-6">
                    <div className="text-center">
                        <Package
                            size={48}
                            strokeWidth={1.5}
                            className="mx-auto mb-6"
                        />

                        <h1 className="text-2xl font-semibold">
                            Your cart is empty
                        </h1>

                        <p className="mt-3 text-sm text-gray-500">
                            Add some products before proceeding to checkout.
                        </p>

                        <Link
                            href="/shop"
                            className="mt-8 inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Continue Shopping
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <Header />

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <Link
                        href="/cart"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
                    >
                        <ArrowLeft size={16} />
                        Back to cart
                    </Link>

                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
                            Checkout
                        </h1>

                        <span className="text-sm text-gray-400">
                            ({cartCount} {cartCount === 1 ? "item" : "items"})
                        </span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
                    {/* LEFT */}
                    <div className="space-y-6">
                        {/* Contact */}
                        <div className="border border-gray-200 bg-white p-6 text-gray-900">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                                    <span className="text-sm">1</span>
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Contact Information
                                    </h2>

                                    <p className="text-xs text-gray-900">
                                        We'll use this to send your order updates.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-900">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder="+254 7XX XXX XXX"
                                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="border border-gray-200 bg-white p-6 text-gray-900">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                                    <MapPin size={16} />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Shipping Address
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Where should we deliver your order?
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black text-gray-700"
                                    />
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Eldoret"
                                            className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                            County
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Uasin Gishu"
                                            className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide">
                                        Delivery Instructions
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Optional delivery instructions..."
                                        className="w-full resize-none border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                                    <Truck size={16} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Delivery Method
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Choose how you'd like to receive your order.
                                    </p>
                                </div>
                            </div>

                            <label className="flex cursor-pointer items-center justify-between border border-black p-4">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        defaultChecked
                                        className="accent-black"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            Standard Delivery
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Delivered within 2–5 business days
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm font-medium">
                                    {shipping === 0
                                        ? "FREE"
                                        : `KSh ${shipping.toLocaleString()}`}
                                </span>
                            </label>
                        </div>

                        {/* Payment */}
                        <div className="border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                                    <CreditCard size={16} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-900">
                                        Payment
                                    </h2>

                                    <p className="text-xs text-gray-500">
                                        Select your preferred payment method.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex cursor-pointer items-center gap-4 border border-black p-4">
                                    <input
                                        type="radio"
                                        name="payment"
                                        defaultChecked
                                        className="accent-black"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            M-Pesa
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Pay securely using M-Pesa
                                        </p>
                                    </div>
                                </label>

                                <label className="flex cursor-pointer items-center gap-4 border border-gray-200 p-4 transition hover:border-black">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="accent-black"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Card
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Visa, Mastercard and other cards
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — ORDER SUMMARY */}
                    <aside className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="border border-gray-200 bg-white text-gray-600">
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="font-semibold text-gray-900">
                                    Order Summary
                                </h2>
                            </div>

                            <div className="max-h-[400px] space-y-5 overflow-y-auto p-6">
                                {cart.map((item) => (
                                    <div
                                        key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                                        className="flex gap-4"
                                    >
                                        <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-gray-100">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-sm font-medium">
                                                {item.name}
                                            </h3>

                                            {item.size && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Size: {item.size}
                                                </p>
                                            )}

                                            {item.color && (
                                                <p className="text-xs text-gray-500">
                                                    Color: {item.color}
                                                </p>
                                            )}

                                            <p className="mt-2 text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="text-sm font-medium">
                                            KSh{" "}
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 p-6">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <span>
                                            KSh {subtotal.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Shipping
                                        </span>

                                        <span>
                                            {shipping === 0
                                                ? "FREE"
                                                : `KSh ${shipping.toLocaleString()}`}
                                        </span>
                                    </div>

                                    <div className="my-4 border-t border-gray-200" />

                                    <div className="flex justify-between text-base font-semibold">
                                        <span>Total</span>

                                        <span>
                                            KSh {total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="mt-6 flex w-full items-center justify-center gap-2 bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Place Order
                                    <ArrowRight size={16} />
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <Lock size={13} />
                                    Secure checkout
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-start gap-3 border border-gray-200 bg-white p-4">
                            <Check
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            <p className="text-xs leading-5 text-gray-500">
                                By placing your order, you agree to our terms
                                and conditions and privacy policy.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

