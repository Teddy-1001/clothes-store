"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Check,
    Mail,
    Phone,
    UserRound,
} from "lucide-react";

import Header from "@/components/Header";

export default function ProfilePage() {
    const [form, setForm] = useState({
        firstName: "Ted",
        lastName: "Williams",
        email: "ted@example.com",
        phone: "",
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace this with your API call later
        console.log("Updated profile:", form);

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">
            <Header />

            {/* =====================================================
                HEADER
            ====================================================== */}

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

                    <Link
                        href="/account"
                        className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to Account
                    </Link>

                    <div className="mt-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            Account
                        </p>

                        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                            Personal Information
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500">
                            Manage the personal information associated
                            with your account.
                        </p>
                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

                    {/* =================================================
                        FORM
                    ================================================== */}

                    <div>

                        <div className="mb-7">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                Your Details
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                                Profile details
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[28px] border border-gray-200 bg-white p-7 sm:p-9"
                        >

                            {/* =================================================
                                NAME
                            ================================================== */}

                            <div className="grid gap-6 sm:grid-cols-2">

                                <FormField
                                    label="First Name"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    icon={UserRound}
                                />

                                <FormField
                                    label="Last Name"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    icon={UserRound}
                                />

                            </div>

                            {/* =================================================
                                EMAIL
                            ================================================== */}

                            <div className="mt-6">
                                <FormField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    icon={Mail}
                                />
                            </div>

                            {/* =================================================
                                PHONE
                            ================================================== */}

                            <div className="mt-6">
                                <FormField
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    placeholder="+254 7XX XXX XXX"
                                    value={form.phone}
                                    onChange={handleChange}
                                    icon={Phone}
                                />
                            </div>

                            {/* =================================================
                                ACTIONS
                            ================================================== */}

                            <div className="mt-9 flex flex-col gap-4 border-t border-gray-100 pt-7 sm:flex-row sm:items-center sm:justify-between">

                                <div className="min-h-5">

                                    {saved && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-green-600">
                                            <Check size={14} />
                                            Changes saved successfully.
                                        </div>
                                    )}

                                </div>

                                <button
                                    type="submit"
                                    className="rounded-full bg-gray-900 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black hover:shadow-lg"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </div>

                    {/* =================================================
                        SIDE PANEL
                    ================================================== */}

                    <aside className="h-fit">

                        <div className="rounded-[28px] bg-gray-900 p-7 text-white sm:p-8">

                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">
                                {getInitials(
                                    `${form.firstName} ${form.lastName}`
                                )}
                            </div>

                            <h2 className="mt-7 text-xl font-semibold">
                                {form.firstName} {form.lastName}
                            </h2>

                            <p className="mt-2 text-xs text-gray-400">
                                {form.email}
                            </p>

                            <div className="mt-8 border-t border-white/10 pt-7">

                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                                    Profile
                                </p>

                                <p className="mt-3 text-sm leading-6 text-gray-400">
                                    Keep your information up to date to make
                                    checkout and delivery easier.
                                </p>

                            </div>

                        </div>

                        {/* =================================================
                            SECURITY
                        ================================================== */}

                        <div className="mt-5 rounded-[28px] border border-gray-200 bg-white p-7">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                                Security
                            </p>

                            <h3 className="mt-3 text-sm font-semibold">
                                Password
                            </h3>

                            <p className="mt-2 text-xs leading-5 text-gray-400">
                                Keep your account secure with a strong,
                                unique password.
                            </p>

                            <Link
                                href="/account/password"
                                className="group mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-xs font-semibold text-gray-700"
                            >
                                Change Password

                                <span className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-900">
                                    →
                                </span>
                            </Link>

                        </div>

                    </aside>

                </div>

            </section>
        </main>
    );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
}) {
    return (
        <div>

            <label
                htmlFor={name}
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
            >
                {label}
            </label>

            <div className="relative">

                <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fafaf9] pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5"
                />

            </div>

        </div>
    );
}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}