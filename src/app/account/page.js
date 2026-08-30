"use client";

import Link from "next/link";
import {
    UserRound,
    Package,
    Heart,
    MapPin,
    Settings,
    LogOut,
    ArrowRight,
    ChevronRight,
    ShoppingBag,
} from "lucide-react";

import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    // Temporary user
    const user = {
        name: "Ted Williams",
        email: "ted@example.com",
    };

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">
            <Header />

            {/* =====================================================
                ACCOUNT HERO
            ====================================================== */}

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        My Account
                    </p>

                    <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                                Hello, {user.name.split(" ")[0]}.
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-6 text-gray-500">
                                Manage your orders, wishlist, account
                                details and preferences.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                {getInitials(user.name)}
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    {user.name}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                {/* =================================================
                    QUICK STATS
                ================================================== */}

                <div className="grid gap-4 sm:grid-cols-3">

                    <StatCard
                        label="Orders"
                        value="0"
                        icon={Package}
                    />

                    <StatCard
                        label="Wishlist"
                        value={wishlistCount}
                        icon={Heart}
                    />

                    <StatCard
                        label="Cart"
                        value={cartCount}
                        icon={ShoppingBag}
                    />

                </div>

                {/* =================================================
                    MAIN GRID
                ================================================== */}

                <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">

                    {/* =================================================
                        ACCOUNT OPTIONS
                    ================================================== */}

                    <div>

                        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                            Account
                        </p>

                        <div className="divide-y divide-gray-200 border-y border-gray-200">

                            <AccountLink
                                href="/account/orders"
                                icon={Package}
                                title="My Orders"
                                description="View your order history and track purchases."
                            />

                            <AccountLink
                                href="/wishlist"
                                icon={Heart}
                                title="Wishlist"
                                description="View the shoes you've saved for later."
                                badge={wishlistCount}
                            />

                            <AccountLink
                                href="/account/profile"
                                icon={UserRound}
                                title="Personal Information"
                                description="Update your name, email and account details."
                            />

                            <AccountLink
                                href="/account/addresses"
                                icon={MapPin}
                                title="Addresses"
                                description="Manage your delivery and billing addresses."
                            />

                            <AccountLink
                                href="/account/settings"
                                icon={Settings}
                                title="Account Settings"
                                description="Manage your preferences and security."
                            />

                        </div>

                    </div>

                    {/* =================================================
                        PROFILE CARD
                    ================================================== */}

                    <aside className="h-fit rounded-[28px] bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.05)] sm:p-8">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                {getInitials(user.name)}
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    {user.name}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {user.email}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 border-t border-gray-100 pt-7">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Member since
                            </p>

                            <p className="mt-2 text-sm font-medium">
                                August 2026
                            </p>

                        </div>

                        <button
                            type="button"
                            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-700 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                            <LogOut size={15} />

                            Sign Out
                        </button>

                    </aside>

                </div>

                {/* =================================================
                    SHOPPING CTA
                ================================================== */}

                <div className="mt-20 overflow-hidden rounded-[32px] bg-gray-900 px-7 py-12 text-white sm:px-12 md:py-16">

                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Find your next pair
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                                Something new is waiting.
                            </h2>

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                                Explore our latest collection and discover
                                something made for you.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="group flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-900 transition-all duration-300 hover:bg-gray-100"
                        >
                            Shop Collection

                            <ArrowRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                    </div>

                </div>

            </section>
        </main>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, value, icon: Icon }) {
    return (
        <div className="group rounded-[24px] border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)]">

            <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white">
                    <Icon size={17} strokeWidth={1.5} />
                </div>

                <span className="text-2xl font-semibold tracking-tight">
                    {value}
                </span>

            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                {label}
            </p>

        </div>
    );
}


/* =========================================================
   ACCOUNT LINK
========================================================= */

function AccountLink({
    href,
    icon: Icon,
    title,
    description,
    badge,
}) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-5 py-7 transition-all duration-300"
        >

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 ring-1 ring-gray-200 transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white group-hover:ring-gray-900">
                <Icon size={17} strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">

                <div className="flex items-center gap-3">

                    <h3 className="text-sm font-semibold">
                        {title}
                    </h3>

                    {badge > 0 && (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold text-gray-600">
                            {badge}
                        </span>
                    )}

                </div>

                <p className="mt-1 max-w-md text-xs leading-5 text-gray-400">
                    {description}
                </p>

            </div>

            <ChevronRight
                size={17}
                className="shrink-0 text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-900"
            />

        </Link>
    );
}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}