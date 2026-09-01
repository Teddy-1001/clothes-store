"use client";

import { useState } from "react";
import {
    ArrowRight,
    CheckCircle,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";
import Header from "@/components/Header";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // Prevent multiple submissions

        try {

            setLoading(true);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to send message.");
                return;
            }

            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("CONTACT FORM ERROR:", error);
            alert("Unable to send your message. Please try again.");
        }finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-black">
            <Header />

            {/* Hero */}
            <section className="border-b border-neutral-200 bg-neutral-50">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                            Get in touch
                        </p>

                        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                            We&apos;d love to hear from you.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                            Have a question about an order, our products, delivery, or
                            anything else? Send us a message and our team will get back to you
                            as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                    {/* Contact Information */}
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Contact information
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Let&apos;s talk.
                        </h2>

                        <p className="mt-5 max-w-md leading-7 text-neutral-600">
                            Our team is here to help with product questions, orders, shipping,
                            returns, and general enquiries.
                        </p>

                        <div className="mt-10 space-y-7">
                            {/* Email */}
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                    <Mail size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a
                                        href="mailto:masangala5@gmail.com"
                                        className="mt-1 block text-sm text-neutral-600 transition hover:text-black"
                                    >
                                        masangala5@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                    <Phone size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a
                                        href="tel:+254798125596"
                                        className="mt-1 block text-sm text-neutral-600 transition hover:text-black"
                                    >
                                        +254 798 125 596
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                    <MapPin size={19} />
                                </div>

                                <div>
                                    <p className="font-semibold">Visit us</p>
                                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                                        Eldoret, Kenya
                                        <br />
                                        Monday – Saturday
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="mt-12 border-t border-neutral-200 pt-8">
                            <p className="text-sm font-semibold">Customer support</p>

                            <p className="mt-2 text-sm leading-6 text-neutral-600">
                                We usually respond to enquiries within 24 hours during business
                                days.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                        {submitted ? (
                            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                                    <CheckCircle size={32} />
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold">Message sent!</h3>

                                <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
                                    Thanks for getting in touch. We&apos;ve received your message
                                    and will get back to you shortly.
                                </p>

                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                                >
                                    Send another message
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500">
                                        Send us a message
                                    </p>

                                    <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                                        How can we help?
                                    </h2>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                    {/* Name + Email */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-medium"
                                            >
                                                Full name
                                            </label>

                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                required
                                                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-medium"
                                            >
                                                Email address
                                            </label>

                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                required
                                                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Subject
                                        </label>

                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="order">Order enquiry</option>
                                            <option value="product">Product question</option>
                                            <option value="shipping">Shipping & delivery</option>
                                            <option value="returns">Returns & exchanges</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-medium"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help..."
                                            required
                                            rows={7}
                                            className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="group flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
                                    >
                                        Send message
                                        <Send
                                            size={17}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </button>

                                    <p className="text-center text-xs leading-5 text-neutral-500">
                                        By submitting this form, you agree to be contacted regarding
                                        your enquiry.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="border-t border-neutral-200 bg-black text-white">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                Need quick answers?
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold">
                                Check our frequently asked questions.
                            </h2>
                        </div>

                        <a
                            href="/faq"
                            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                        >
                            View FAQ
                            <ArrowRight size={17} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
