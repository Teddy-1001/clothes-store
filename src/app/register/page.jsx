"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    Lock,
    Mail,
    UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
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

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!form.terms) {
            alert("Please accept the terms and conditions.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.json()
            if (!response.ok) {
                alert(data.message || "Registration failed.");
                return;
            }

            const authResponse = await fetch("/api/auth/me", {
                method: "GET",
                credentials: "include"
            })

            if (authResponse.ok) {
                router.push("/")
                return;
            }
            alert("Account was created, but we could not sign you in.");

            // console.log("Registration successful:", data);

            // alert("Account created successfully!");
            // window.location.href = "/";



        } catch (error) {
            console.error("Registration error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#fafaf9]">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* =====================================================
                    FORM SIDE
                ====================================================== */}

                <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:order-first lg:px-16 xl:px-24">

                    <div className="w-full max-w-md">

                        {/* Logo */}

                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-[-0.03em]"
                        >
                            YOUR BRAND
                        </Link>

                        {/* Header */}

                        <div className="mt-12">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Join us
                            </p>

                            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                                Create account
                            </h1>

                            <p className="mt-4 text-sm leading-6 text-gray-500">
                                Create your account and make every
                                shopping experience feel personal.
                            </p>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10"
                        >

                            {/* Name */}

                            <div>

                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                                >
                                    Full name
                                </label>

                                <div className="relative">

                                    <UserRound
                                        size={16}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        required
                                        autoComplete="name"
                                        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                                    />

                                </div>

                            </div>

                            {/* Email */}

                            <div className="mt-5">

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

                            <div className="mt-5">

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                                >
                                    Password
                                </label>

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
                                        placeholder="Create a password"
                                        required
                                        minLength={8}
                                        autoComplete="new-password"
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
                                    >
                                        {showPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>

                                </div>

                                <p className="mt-2 text-[10px] text-gray-400">
                                    Use at least 8 characters.
                                </p>

                            </div>

                            {/* Confirm password */}

                            <div className="mt-5">

                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={16}
                                        strokeWidth={1.5}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Repeat your password"
                                        required
                                        autoComplete="new-password"
                                        className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (current) => !current
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-900"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Terms */}

                            <label className="mt-6 flex cursor-pointer items-start gap-3">

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={form.terms}
                                    onChange={handleChange}
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gray-900"
                                />

                                <span className="text-xs leading-5 text-gray-500">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        className="font-semibold text-gray-900 hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="font-semibold text-gray-900 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>

                            </label>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="group mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gray-900 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating account..."
                                    : "Create Account"}

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

                        {/* Login */}

                        <p className="mt-8 text-center text-xs text-gray-400">

                            Already have an account?{" "}

                            <Link
                                href="/login"
                                className="font-semibold text-gray-900 transition-colors hover:text-gray-500"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

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
                        className="object-cover -scale-x-100"
                    />

                    <div className="absolute inset-0 bg-black/35" />

                    <div className="absolute bottom-10 left-10 right-10 z-10 text-white">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                            Your style starts here
                        </p>

                        <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] xl:text-6xl">
                            Find the pair that feels like you.
                        </h2>

                        <div className="mt-6 flex items-center gap-3 text-xs text-white/60">
                            <Check size={14} />
                            Save your favourites
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
                            <Check size={14} />
                            Track your orders
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
                            <Check size={14} />
                            Faster checkout
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}