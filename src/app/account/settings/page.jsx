"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Bell,
    ChevronRight,
    Lock,
    Mail,
    ShieldCheck,
    Trash2,
    UserRound,
} from "lucide-react";

import Header from "@/components/Header";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: false,
        newsletter: true,
    });

    const [saved, setSaved] = useState(false);

    const toggleSetting = (key) => {
        setSettings((current) => ({
            ...current,
            [key]: !current[key],
        }));

        setSaved(false);
    };

    const saveSettings = () => {
        // Replace with your API call later
        console.log("Settings:", settings);

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
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
                            Settings
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500">
                            Manage your preferences, notifications and
                            account security.
                        </p>
                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

                    {/* =================================================
                        LEFT
                    ================================================== */}

                    <div className="space-y-8">

                        {/* =================================================
                            NOTIFICATIONS
                        ================================================== */}

                        <SettingsSection
                            icon={Bell}
                            label="Notifications"
                            title="Communication preferences"
                            description="Choose what you'd like to hear from us about."
                        >

                            <SettingRow
                                title="Order updates"
                                description="Receive updates about your purchases and deliveries."
                                checked={settings.orderUpdates}
                                onChange={() =>
                                    toggleSetting("orderUpdates")
                                }
                            />

                            <SettingRow
                                title="Special offers"
                                description="Get notified about discounts, new releases and exclusive offers."
                                checked={settings.promotions}
                                onChange={() =>
                                    toggleSetting("promotions")
                                }
                            />

                            <SettingRow
                                title="Newsletter"
                                description="Receive occasional news, style inspiration and collection updates."
                                checked={settings.newsletter}
                                onChange={() =>
                                    toggleSetting("newsletter")
                                }
                            />

                        </SettingsSection>

                        {/* =================================================
                            ACCOUNT
                        ================================================== */}

                        <SettingsSection
                            icon={UserRound}
                            label="Account"
                            title="Account management"
                            description="Manage important details connected to your account."
                        >

                            <SettingsLink
                                href="/account/profile"
                                icon={UserRound}
                                title="Personal information"
                                description="Update your name, email and phone number."
                            />

                            <SettingsLink
                                href="/account/password"
                                icon={Lock}
                                title="Password"
                                description="Change your account password."
                            />

                        </SettingsSection>

                        {/* =================================================
                            PRIVACY
                        ================================================== */}

                        <SettingsSection
                            icon={ShieldCheck}
                            label="Privacy"
                            title="Privacy & security"
                            description="Review how your account information is protected."
                        >

                            <SettingsLink
                                href="/account/privacy"
                                icon={ShieldCheck}
                                title="Privacy settings"
                                description="Manage your privacy preferences and data."
                            />

                            <SettingsLink
                                href="/account/sessions"
                                icon={Lock}
                                title="Active sessions"
                                description="Review devices currently signed into your account."
                            />

                        </SettingsSection>

                        {/* =================================================
                            DANGER ZONE
                        ================================================== */}

                        <section className="rounded-[28px] border border-red-100 bg-white p-7 sm:p-9">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                                    <Trash2
                                        size={17}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
                                        Danger Zone
                                    </p>

                                    <h2 className="mt-2 text-lg font-semibold">
                                        Delete account
                                    </h2>

                                    <p className="mt-2 max-w-lg text-xs leading-5 text-gray-400">
                                        Permanently delete your account and
                                        associated personal information.
                                    </p>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="mt-7 rounded-full border border-red-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-red-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                            >
                                Delete My Account
                            </button>

                        </section>

                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================== */}

                    <aside className="h-fit space-y-5">

                        {/* Save card */}

                        <div className="rounded-[28px] bg-gray-900 p-7 text-white sm:p-8">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                                <Mail size={17} strokeWidth={1.5} />
                            </div>

                            <h2 className="mt-6 text-xl font-semibold">
                                Stay in the loop.
                            </h2>

                            <p className="mt-3 text-xs leading-6 text-gray-400">
                                Keep your preferences updated so we only
                                send you the things that matter.
                            </p>

                            <button
                                type="button"
                                onClick={saveSettings}
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-900 transition-all duration-300 hover:bg-gray-100"
                            >
                                {saved ? "Changes Saved" : "Save Preferences"}
                            </button>

                        </div>

                        {/* Account links */}

                        <div className="rounded-[28px] border border-gray-200 bg-white p-3">

                            <SettingsLink
                                href="/account/profile"
                                icon={UserRound}
                                title="Profile"
                                description="Personal information"
                                compact
                            />

                            <SettingsLink
                                href="/account/orders"
                                icon={Bell}
                                title="Orders"
                                description="Purchase history"
                                compact
                            />

                        </div>

                    </aside>

                </div>

            </section>
        </main>
    );
}


/* =========================================================
   SETTINGS SECTION
========================================================= */

function SettingsSection({
    icon: Icon,
    label,
    title,
    description,
    children,
}) {
    return (
        <section className="rounded-[28px] border border-gray-200 bg-white p-7 sm:p-9">

            <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                    <Icon size={17} strokeWidth={1.5} />
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        {label}
                    </p>

                    <h2 className="mt-2 text-lg font-semibold">
                        {title}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                        {description}
                    </p>
                </div>

            </div>

            <div className="mt-7 divide-y divide-gray-100 border-t border-gray-100">
                {children}
            </div>

        </section>
    );
}


/* =========================================================
   TOGGLE ROW
========================================================= */

function SettingRow({
    title,
    description,
    checked,
    onChange,
}) {
    return (
        <div className="flex items-center justify-between gap-6 py-6">

            <div>
                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={onChange}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                    checked
                        ? "bg-gray-900"
                        : "bg-gray-200"
                }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                        checked
                            ? "translate-x-6"
                            : "translate-x-1"
                    }`}
                />
            </button>

        </div>
    );
}


/* =========================================================
   SETTINGS LINK
========================================================= */

function SettingsLink({
    href,
    icon: Icon,
    title,
    description,
    compact = false,
}) {
    return (
        <Link
            href={href}
            className={`group flex items-center gap-4 rounded-2xl transition-all duration-300 hover:bg-gray-50 ${
                compact ? "p-4" : "py-6"
            }`}
        >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
                <Icon size={16} strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">

                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                    {description}
                </p>

            </div>

            <ChevronRight
                size={16}
                className="shrink-0 text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-900"
            />

        </Link>
    );
}