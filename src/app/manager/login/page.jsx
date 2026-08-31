"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Store,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isManagerRole } from "@/lib/roles";

function ManagerLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, logout, user, loading: authLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const redirectTo = searchParams.get("redirect") || "/manager";

    useEffect(() => {
        if (!authLoading && user && isManagerRole(user.role)) {
            router.replace(redirectTo);
        }
    }, [authLoading, user, router, redirectTo]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await login(
                form.email.trim().toLowerCase(),
                form.password,
                form.remember,
            );

            if (!result.success) {
                setError(result.message || "Login failed.");
                return;
            }

            if (!isManagerRole(result.user?.role)) {
                await logout();
                setError("This account does not have manager access.");
                return;
            }

            router.push(redirectTo);
            router.refresh();
        } catch (loginError) {
            console.error("Manager login error:", loginError);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f7f7f5]">
            <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111] text-white">
                        <Store size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold tracking-wide">
                            MASANGALA
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            Manager Portal
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Secure access
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                        Manager sign in
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Sign in with your manager account to access the
                        dashboard, products, orders, and inventory.
                    </p>

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="manager@example.com"
                                    required
                                    autoComplete="email"
                                    className="h-12 w-full rounded-xl border border-black/10 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                    className="h-12 w-full rounded-xl border border-black/10 bg-gray-50 pl-11 pr-12 text-sm outline-none transition focus:border-black focus:bg-white"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900"
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

                        <label className="flex cursor-pointer items-center gap-3">
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111] text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in to Manager"}
                            {!loading && (
                                <ArrowRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    <Link href="/" className="font-medium text-gray-600 hover:text-black">
                        Back to store
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default function ManagerLoginPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
                    Loading...
                </div>
            }
        >
            <ManagerLoginForm />
        </Suspense>
    );
}
