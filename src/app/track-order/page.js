"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock,
    Package,
    Search,
    Truck,
} from "lucide-react";

import Header from "@/components/Header";

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const handleTrackOrder = async (e) => {
        e.preventDefault();

        setError("");
        setOrder(null);

        if (!orderNumber.trim() || !email.trim()) {
            setError("Please enter your order number and email address.");
            return;
        }

        try {
            setLoading(true);

            /*
             * Connect this to your API later:
             *
             * const response = await fetch(
             *     `/api/orders/track?order=${orderNumber}&email=${email}`
             * );
             *
             * const data = await response.json();
             *
             * if (!response.ok) {
             *     throw new Error(data.message);
             * }
             *
             * setOrder(data);
             */

            // Temporary demonstration
            await new Promise((resolve) => setTimeout(resolve, 800));

            setOrder({
                orderNumber: orderNumber,
                status: "Shipped",
                date: "August 30, 2026",
                estimatedDelivery: "September 2–4, 2026",
            });
        } catch (error) {
            console.error(error);
            setError(
                error.message || "Unable to find your order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* HERO */}
            <section className="border-b border-gray-200 bg-[#f7f7f5]">
                <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
                        Order Tracking
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Track your order
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Enter your order number and email address to see the
                        latest update on your delivery.
                    </p>
                </div>
            </section>

            {/* TRACKING FORM */}
            <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
                    <div className="border border-gray-200 bg-white p-6 sm:p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold">
                                Find your order
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Enter the details from your order confirmation.
                            </p>
                        </div>

                        <form
                            onSubmit={handleTrackOrder}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="orderNumber"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wide"
                                >
                                    Order Number
                                </label>

                                <input
                                    id="orderNumber"
                                    type="text"
                                    value={orderNumber}
                                    onChange={(e) =>
                                        setOrderNumber(e.target.value)
                                    }
                                    placeholder="e.g. ORD-10001"
                                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-medium uppercase tracking-wide"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                                />
                            </div>

                            {error && (
                                <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    "Tracking Order..."
                                ) : (
                                    <>
                                        Track Order
                                        <Search size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-60"
                            >
                                <ArrowLeft size={15} />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* HELP */}
                    <div className="h-fit border border-gray-200 bg-[#fafafa] p-6">
                        <Package
                            size={25}
                            strokeWidth={1.5}
                            className="mb-5"
                        />

                        <h2 className="font-semibold">
                            Where can I find my order number?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Your order number can be found in the confirmation
                            email we sent after you completed your purchase.
                        </p>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                Need help?
                            </p>

                            <Link
                                href="/contact"
                                className="mt-2 inline-flex items-center gap-2 text-sm font-medium"
                            >
                                Contact us
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ORDER RESULT */}
            {order && (
                <section className="mx-auto max-w-5xl px-6 pb-20 lg:px-8">
                    <div className="border border-gray-200 bg-white">
                        {/* ORDER HEADER */}
                        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Order
                                </p>

                                <h2 className="mt-1 text-xl font-semibold">
                                    {order.orderNumber}
                                </h2>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-medium text-white">
                                <Truck size={14} />
                                {order.status}
                            </span>
                        </div>

                        {/* ORDER INFO */}
                        <div className="grid gap-6 border-b border-gray-200 p-6 sm:grid-cols-3">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Order Date
                                </p>

                                <p className="mt-2 text-sm font-medium">
                                    {order.date}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Current Status
                                </p>

                                <p className="mt-2 text-sm font-medium">
                                    {order.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Estimated Delivery
                                </p>

                                <p className="mt-2 text-sm font-medium">
                                    {order.estimatedDelivery}
                                </p>
                            </div>
                        </div>

                        {/* PROGRESS */}
                        <div className="p-6 sm:p-8">
                            <h3 className="mb-8 text-sm font-semibold">
                                Order Progress
                            </h3>

                            <div className="relative">
                                <div className="absolute left-4 right-4 top-4 hidden h-px bg-gray-200 sm:block" />

                                <div className="grid gap-8 sm:grid-cols-4">
                                    <TrackingStep
                                        icon={Check}
                                        title="Order Placed"
                                        description="Your order has been received"
                                        completed
                                    />

                                    <TrackingStep
                                        icon={Package}
                                        title="Processing"
                                        description="We're preparing your order"
                                        completed
                                    />

                                    <TrackingStep
                                        icon={Truck}
                                        title="Shipped"
                                        description="Your order is on the way"
                                        active
                                    />

                                    <TrackingStep
                                        icon={Clock}
                                        title="Delivered"
                                        description="Package delivered to you"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* BOTTOM CTA */}
            <section className="border-t border-gray-200 bg-[#fafafa]">
                <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Looking for something new?
                    </h2>

                    <p className="mt-3 text-sm text-gray-500">
                        Discover our latest styles and collections.
                    </p>

                    <Link
                        href="/shop"
                        className="mt-6 inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Shop Now
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function TrackingStep({
    icon: Icon,
    title,
    description,
    completed = false,
    active = false,
}) {
    return (
        <div className="relative flex gap-4 sm:block sm:text-center">
            <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:mx-auto ${
                    completed || active
                        ? "bg-black text-white"
                        : "border border-gray-300 bg-white text-gray-400"
                }`}
            >
                <Icon size={14} />
            </div>

            <div className="pt-1 sm:pt-4">
                <h4
                    className={`text-sm font-medium ${
                        active ? "text-black" : ""
                    }`}
                >
                    {title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
}
