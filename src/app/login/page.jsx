"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {login} = useAuth()

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
        const result = await login(
            form.email.trim().toLowerCase(),
            form.password,
            form.remember
        )
        if (!result.success) {
            alert(result.message);
            return;
        }

        router.push("/account");

    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};

    return (
        <main className="min-h-screen bg-[#fafaf9]">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* =====================================================
                    IMAGE SIDE
                ====================================================== */}

                <div className="relative hidden overflow-hidden lg:block">

                    <Image
                        src="/images/shoe-store-bg.jpg"
                        alt="Shoe collection"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-black/35" />

                    {/* Brand */}

                    <div className="absolute left-10 top-10 z-10">
                        <Link
                            href="/"
                            className="text-xl font-semibold tracking-[-0.03em] text-white"
                        >
                            YOUR BRAND
                        </Link>
                    </div>

                    {/* Bottom copy */}

                    <div className="absolute bottom-10 left-10 right-10 z-10 text-white">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                            Step into something better
                        </p>

                        <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] xl:text-6xl">
                            Your next favourite pair is waiting.
                        </h2>

                        <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
                            Sign in to access your wishlist, orders,
                            saved addresses and personalised experience.
                        </p>

                    </div>

                </div>

                {/* =====================================================
                    FORM SIDE
                ====================================================== */}

                <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">

                    <div className="w-full max-w-md">

                        {/* Mobile logo */}

                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-[-0.03em] lg:hidden"
                        >
                            YOUR BRAND
                        </Link>

                        {/* Header */}

                        <div className="mt-12 lg:mt-0">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Welcome back
                            </p>

                            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                                Sign in
                            </h1>

                            <p className="mt-4 text-sm leading-6 text-gray-500">
                                Welcome back. Sign in to continue
                                shopping with us.
                            </p>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10"
                        >

                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                                >
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={16}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div className="mt-6">

                                <div className="mb-2 flex items-center justify-between">

                                    <label
                                        htmlFor="password"
                                        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-[10px] font-semibold text-gray-400 transition-colors hover:text-gray-900"
                                    >
                                        Forgot password?
                                    </Link>

                                </div>

                                <div className="relative">

                                    <Lock
                                        size={16}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (current) => !current
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Remember */}

                            <label className="mt-6 flex cursor-pointer items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={form.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                                />

                                <span className="text-xs text-gray-500">
                                    Keep me signed in
                                </span>

                            </label>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-900 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}

                                {!loading && (
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                )}
                            </button>

                        </form>

                        {/* Divider */}

                        <div className="my-8 flex items-center gap-4">

                            <div className="h-px flex-1 bg-gray-200" />

                            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Or
                            </span>

                            <div className="h-px flex-1 bg-gray-200" />

                        </div>

                        {/* Google */}

                        <button
                            type="button"
                            className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white text-xs font-semibold transition-all duration-300 hover:border-gray-900 hover:shadow-sm"
                        >
                            <span className="text-sm font-bold">
                                G
                            </span>

                            Continue with Google
                        </button>

                        {/* Register */}

                        <p className="mt-8 text-center text-xs text-gray-400">

                            Don't have an account?{" "}

                            <Link
                                href="/register"
                                className="font-semibold text-gray-900 transition-colors hover:text-gray-500"
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
}