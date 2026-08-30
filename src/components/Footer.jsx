import { Heart, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white">

            {/* Newsletter Bar */}
            <div className="border-b border-white/10">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

                        <div>
                            <h3 className="text-lg font-semibold">
                                Join Our Community
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Get exclusive offers, new arrivals & style tips delivered to your inbox.
                            </p>
                        </div>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex w-full max-w-md gap-2"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-gray-500 transition focus:border-white/30 focus:bg-white/10 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Image
                            src="/images/logo_header_png.png"
                            alt="Store logo"
                            width={120}
                            height={50}
                            className="h-9 w-auto object-contain brightness-0 invert"
                        />

                        <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
                            Premium footwear for every occasion.
                            Boots, sneakers, loafers & more — delivered
                            countrywide.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/30 hover:text-white"
                            >
                                <Instagram size={17} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/30 hover:text-white"
                            >
                                <Twitter size={17} />
                            </a>
                            <a
                                href="mailto:info@store.com"
                                aria-label="Email"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/30 hover:text-white"
                            >
                                <Mail size={17} />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Shop
                        </p>

                        <ul className="mt-5 space-y-3.5">
                            {[
                                { name: "All Products", href: "/shop" },
                                { name: "Running Shoes", href: "/collections" },
                                { name: "Sneakers", href: "/collections" },
                                { name: "Boots", href: "/collections" },
                                { name: "Formal Shoes", href: "/collections" },
                                { name: "Heels", href: "/collections" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Help
                        </p>

                        <ul className="mt-5 space-y-3.5">
                            {[
                                { name: "Track Your Order", href: "/track-order" },
                                { name: "Shipping & Returns", href: "#" },
                                { name: "FAQs", href: "/faqs" },
                                { name: "Size Guide", href: "#" },
                                { name: "Contact Us", href: "#" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Get in Touch
                        </p>

                        <ul className="mt-5 space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="mt-0.5 shrink-0 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-400">
                                        0713 075 115
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        0742 447 423
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <Mail size={16} className="mt-0.5 shrink-0 text-gray-500" />
                                <p className="text-sm text-gray-400">
                                    info@yourstore.co.ke
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-500" />
                                <p className="text-sm text-gray-400">
                                    Nairobi, Kenya
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} Your Clothing Store. All rights reserved.
                        </p>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            Made with
                            <Heart size={12} fill="currentColor" className="text-red-500" />
                            in Nairobi
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
