"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Bell,
    Check,
    ChevronRight,
    Cookie,
    Download,
    Eye,
    Lock,
    ShieldCheck,
    Trash2,
} from "lucide-react";

import Header from "@/components/Header";

export default function PrivacyPage() {
    const [preferences, setPreferences] = useState({
        personalized: true,
        analytics: true,
        marketing: false,
    });

    const [saved, setSaved] = useState(false);

    const togglePreference = (key) => {
        setPreferences((current) => ({
            ...current,
            [key]: !current[key],
        }));

        setSaved(false);
    };

    const savePreferences = () => {
        // Replace with your API call later
        console.log("Privacy preferences:", preferences);

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
                        href="/account/settings"
                        className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to Settings
                    </Link>

                    <div className="mt-10">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            Account
                        </p>

                        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                            Privacy
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-6 text-gray-500">
                            Control how your information is used and
                            manage your privacy preferences.
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

                        {/* Privacy overview */}

                        <section className="rounded-[28px] bg-gray-900 p-7 text-white sm:p-9">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                                <ShieldCheck
                                    size={20}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                Your privacy matters
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                                You're in control.
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400">
                                We only use your information to provide
                                our services, process your orders and
                                improve your shopping experience.
                            </p>

                        </section>

                        {/* =================================================
                            DATA & PERSONALIZATION
                        ================================================== */}

                        <PrivacySection
                            icon={Eye}
                            label="Personalization"
                            title="Shopping experience"
                            description="Choose whether we can use your activity to personalize your experience."
                        >

                            <PrivacyToggle
                                title="Personalized recommendations"
                                description="Allow us to use your browsing and purchase history to suggest products you may like."
                                checked={preferences.personalized}
                                onChange={() =>
                                    togglePreference("personalized")
                                }
                            />

                        </PrivacySection>

                        {/* =================================================
                            ANALYTICS
                        ================================================== */}

                        <PrivacySection
                            icon={Download}
                            label="Analytics"
                            title="Help us improve"
                            description="Anonymous information helps us understand how customers use our website."
                        >

                            <PrivacyToggle
                                title="Analytics data"
                                description="Allow anonymous usage information to help us improve performance and functionality."
                                checked={preferences.analytics}
                                onChange={() =>
                                    togglePreference("analytics")
                                }
                            />

                        </PrivacySection>

                        {/* =================================================
                            MARKETING
                        ================================================== */}

                        <PrivacySection
                            icon={Bell}
                            label="Marketing"
                            title="Marketing communications"
                            description="Choose whether you'd like to receive personalized marketing."
                        >

                            <PrivacyToggle
                                title="Marketing personalization"
                                description="Allow us to use your preferences and activity to personalize promotional communications."
                                checked={preferences.marketing}
                                onChange={() =>
                                    togglePreference("marketing")
                                }
                            />

                        </PrivacySection>

                        {/* =================================================
                            COOKIES
                        ================================================== */}

                        <PrivacySection
                            icon={Cookie}
                            label="Cookies"
                            title="Cookie preferences"
                            description="Cookies help us keep the website working and remember your preferences."
                        >

                            <PrivacyInfo
                                title="Essential cookies"
                                description="These cookies are required for features such as login, cart functionality and checkout."
                                required
                            />

                            <PrivacyInfo
                                title="Preference cookies"
                                description="These remember choices you've made, such as your preferred settings."
                                required={false}
                            />

                        </PrivacySection>

                        {/* =================================================
                            SAVE
                        ================================================== */}

                        <div className="flex flex-col gap-4 rounded-[28px] border border-gray-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">

                            <div>
                                <h2 className="text-sm font-semibold">
                                    Privacy preferences
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Save your changes to update your
                                    privacy preferences.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={savePreferences}
                                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black"
                            >
                                {saved && <Check size={14} />}

                                {saved
                                    ? "Saved"
                                    : "Save Preferences"}
                            </button>

                        </div>

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
                                        Account data
                                    </p>

                                    <h2 className="mt-2 text-lg font-semibold">
                                        Delete your account
                                    </h2>

                                    <p className="mt-2 max-w-lg text-xs leading-5 text-gray-400">
                                        Permanently delete your account
                                        and associated personal
                                        information.
                                    </p>
                                </div>

                            </div>

                            <Link
                                href="/account/settings"
                                className="mt-7 inline-flex items-center gap-2 rounded-full border border-red-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-red-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                            >
                                Manage Account
                                <ChevronRight size={13} />
                            </Link>

                        </section>

                    </div>

                    {/* =================================================
                        RIGHT SIDEBAR
                    ================================================== */}

                    <aside className="h-fit space-y-5">

                        {/* Security */}

                        <div className="rounded-[28px] border border-gray-200 bg-white p-7 sm:p-8">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                                <Lock
                                    size={17}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h2 className="mt-6 text-lg font-semibold">
                                Your information is protected.
                            </h2>

                            <p className="mt-3 text-xs leading-6 text-gray-400">
                                We take reasonable measures to protect
                                your personal information and keep your
                                account secure.
                            </p>

                        </div>

                        {/* Quick links */}

                        <div className="rounded-[28px] border border-gray-200 bg-white p-3">

                            <PrivacyLink
                                href="/account/settings"
                                icon={ShieldCheck}
                                title="Security"
                                description="Account security"
                            />

                            <PrivacyLink
                                href="/account/settings"
                                icon={Bell}
                                title="Notifications"
                                description="Communication preferences"
                            />

                        </div>

                        {/* Data request */}

                        <div className="rounded-[28px] bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.04)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                                <Download
                                    size={17}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h2 className="mt-6 text-lg font-semibold">
                                Your data
                            </h2>

                            <p className="mt-3 text-xs leading-5 text-gray-400">
                                Request a copy of the personal
                                information associated with your
                                account.
                            </p>

                            <button
                                type="button"
                                className="mt-6 w-full rounded-full border border-gray-200 px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 transition-all duration-300 hover:border-gray-900 hover:text-gray-900"
                            >
                                Request My Data
                            </button>

                        </div>

                    </aside>

                </div>

            </section>
        </main>
    );
}


/* =========================================================
   PRIVACY SECTION
========================================================= */

function PrivacySection({
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
                    <Icon
                        size={17}
                        strokeWidth={1.5}
                    />
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
   PRIVACY TOGGLE
========================================================= */

function PrivacyToggle({
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
   PRIVACY INFO
========================================================= */

function PrivacyInfo({
    title,
    description,
    required,
}) {
    return (
        <div className="flex items-start justify-between gap-6 py-6">

            <div>
                <h3 className="text-sm font-semibold">
                    {title}
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                    {description}
                </p>
            </div>

            <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider ${
                    required
                        ? "bg-gray-100 text-gray-500"
                        : "bg-gray-50 text-gray-400"
                }`}
            >
                {required ? "Required" : "Optional"}
            </span>

        </div>
    );
}


/* =========================================================
   SIDEBAR LINK
========================================================= */

function PrivacyLink({
    href,
    icon: Icon,
    title,
    description,
}) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-gray-50"
        >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white">
                <Icon
                    size={16}
                    strokeWidth={1.5}
                />
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
                size={15}
                className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-900"
            />

        </Link>
    );
}