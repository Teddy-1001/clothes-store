"use client";

import { useState } from "react";
import {
    ArrowRightLeft,
    ShoppingBag,
    Heart,
    Menu,
    Search,
    User,
    X,
    LogOut,
    Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import CartSidebar from "./CartSidebar";
import SearchBar from "./SearchBar";

const NavLink = ({ href, children, active }) => {
    return (
        <Link
            href={href}
            className={`
                group relative inline-flex items-center
                px-3.5 py-4
                text-[13px] font-medium tracking-wide
                transition-colors duration-300
                ${active
                    ? "text-gray-950"
                    : "text-gray-500 hover:text-gray-950"
                }
            `}
        >
            {children}

            {active && (
                <>
                    {/* Top-left corner */}
                    <span className="absolute left-1.5 top-1.5 h-px w-6 bg-gray-900" />
                    <span className="absolute left-1.5 top-1.5 h-6 w-px bg-gray-900" />

                    {/* Bottom-right corner */}
                    <span className="absolute bottom-1.5 right-1.5 h-px w-6 bg-gray-900" />
                    <span className="absolute bottom-1.5 right-1.5 h-6 w-px bg-gray-900" />
                </>
            )}

            {/* Hover underline */}
            <span
                className={`
                    absolute bottom-0 left-1/2 h-px
                    -translate-x-1/2
                    bg-gray-900
                    transition-all duration-300
                    ${active
                        ? "w-3 opacity-0"
                        : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-100"
                    }
                `}
            />
        </Link>
    );
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const pathname = usePathname();

    const {
        cartCount,
        cartOpen,
        setCartOpen,
    } = useCart();

    const {
        user,
        loading,
        isAuthenticated,
        logout,
    } = useAuth();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = async () => {
        closeMenu();

        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <>
            {/* =====================================================
                HEADER
            ====================================================== */}

            <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">

                    {/* Search */}
                    {searchOpen && (
                        <SearchBar
                            isOpen={searchOpen}
                            onClose={() => setSearchOpen(false)}
                        />
                    )}

                    <nav className="flex h-20 items-center justify-between">

                        {/* =================================================
                            LOGO + DESKTOP NAVIGATION
                        ================================================= */}

                        <div className="flex items-center gap-12">

                            {/* Logo */}
                            <Link
                                href="/"
                                className="shrink-0"
                            >
                                <Image
                                    src="/images/logo_header_png.png"
                                    alt="Clothing store logo"
                                    width={120}
                                    height={50}
                                    priority
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>

                            {/* Desktop navigation */}
                            <div className="hidden items-center gap-6 md:flex">

                                <NavLink
                                    href="/shop/shoes"
                                    active={
                                        pathname === "/shop" ||
                                        pathname.startsWith("/shop/")
                                    }
                                >
                                    Shop
                                </NavLink>

                                <NavLink
                                    href="/collections"
                                    active={
                                        pathname === "/collections" ||
                                        pathname.startsWith("/collections/")
                                    }
                                >
                                    Collections
                                </NavLink>

                                <NavLink
                                    href="/about"
                                    active={pathname === "/about"}
                                >
                                    About Us
                                </NavLink>

                                <NavLink
                                    href="/track-order"
                                    active={pathname === "/track-order"}
                                >
                                    Track Order
                                </NavLink>

                            </div>
                        </div>

                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div className="flex items-center gap-1 sm:gap-2">

                            {/* Search */}
                            <button
                                type="button"
                                onClick={() => setSearchOpen(true)}
                                aria-label="Search"
                                className="
                                    flex h-10 w-10 items-center justify-center
                                    rounded-full text-gray-700
                                    transition
                                    hover:bg-gray-100
                                    hover:text-gray-950
                                "
                            >
                                <Search
                                    size={20}
                                    strokeWidth={1.7}
                                />
                            </button>

                            {/* Compare */}
                            <Link
                                href="/compare"
                                aria-label="Compare products"
                                className="
                                    hidden h-10 w-10 items-center justify-center
                                    rounded-full text-gray-700
                                    transition
                                    hover:bg-gray-100
                                    hover:text-gray-950
                                    lg:flex
                                "
                            >
                                <ArrowRightLeft
                                    size={20}
                                    strokeWidth={1.7}
                                />
                            </Link>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                aria-label="Wishlist"
                                className="
                                    hidden h-10 w-10 items-center justify-center
                                    rounded-full text-gray-700
                                    transition
                                    hover:bg-red-50
                                    hover:text-red-500
                                    sm:flex
                                "
                            >
                                <Heart
                                    size={20}
                                    strokeWidth={1.7}
                                />
                            </Link>

                            {/* Cart */}
                            <button
                                type="button"
                                aria-label="Open shopping bag"
                                onClick={() => setCartOpen(true)}
                                className="
                                    relative flex h-10 w-10
                                    items-center justify-center
                                    rounded-full text-gray-700
                                    transition
                                    hover:bg-gray-100
                                    hover:text-gray-950
                                "
                            >
                                <ShoppingBag
                                    size={20}
                                    strokeWidth={1.7}
                                />

                                {cartCount > 0 && (
                                    <span
                                        className="
                                            absolute right-0.5 top-0.5
                                            flex h-4.5 w-4.5
                                            items-center justify-center
                                            rounded-full bg-gray-900
                                            text-[9px] font-semibold text-white
                                        "
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* =================================================
                                AUTHENTICATION
                            ================================================= */}

                            {loading ? (
                                /* Loading */
                                <div
                                    className="
                                        hidden h-10 w-10
                                        animate-pulse rounded-full
                                        bg-gray-100 md:block
                                    "
                                />
                            ) : isAuthenticated ? (
                                /* Authenticated user */
                                <div className="group relative hidden md:block">

                                    {/* Account button */}
                                    <Link
                                        href="/account"
                                        aria-label="Account"
                                        className="
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-full
                                            text-gray-700
                                            transition
                                            hover:bg-gray-100
                                            hover:text-gray-950
                                        "
                                    >
                                        <User
                                            size={20}
                                            strokeWidth={1.7}
                                        />
                                    </Link>

                                    {/* Account dropdown */}
                                    <div
                                        className="
                                            invisible absolute right-0 top-full
                                            w-60 pt-3
                                            opacity-0
                                            transition-all duration-200
                                            group-hover:visible
                                            group-hover:opacity-100
                                        "
                                    >
                                        <div
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border border-gray-100
                                                bg-white
                                                shadow-xl
                                                shadow-gray-900/5
                                            "
                                        >

                                            {/* User information */}
                                            <div className="border-b border-gray-100 px-4 py-4">

                                                <p
                                                    className="
                                                        text-[9px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-gray-400
                                                    "
                                                >
                                                    Signed in as
                                                </p>

                                                <p
                                                    className="
                                                        mt-1 truncate
                                                        text-sm font-semibold
                                                        text-gray-900
                                                    "
                                                >
                                                    {user?.name}
                                                </p>

                                                <p
                                                    className="
                                                        mt-0.5 truncate
                                                        text-xs text-gray-400
                                                    "
                                                >
                                                    {user?.email}
                                                </p>

                                            </div>

                                            {/* My Account */}
                                            <Link
                                                href="/account"
                                                className="
                                                    flex items-center gap-3
                                                    px-4 py-3
                                                    text-sm text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                    hover:text-gray-950
                                                "
                                            >
                                                <User
                                                    size={16}
                                                    strokeWidth={1.7}
                                                />

                                                My Account
                                            </Link>

                                            {/* Profile */}
                                            <Link
                                                href="/account/profile"
                                                className="
                                                    flex items-center gap-3
                                                    px-4 py-3
                                                    text-sm text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                    hover:text-gray-950
                                                "
                                            >
                                                <User
                                                    size={16}
                                                    strokeWidth={1.7}
                                                />

                                                Profile
                                            </Link>

                                            {/* Settings */}
                                            <Link
                                                href="/account/settings"
                                                className="
                                                    flex items-center gap-3
                                                    px-4 py-3
                                                    text-sm text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                    hover:text-gray-950
                                                "
                                            >
                                                <Settings
                                                    size={16}
                                                    strokeWidth={1.7}
                                                />

                                                Settings
                                            </Link>

                                            {/* Wishlist */}
                                            <Link
                                                href="/wishlist"
                                                className="
                                                    flex items-center gap-3
                                                    px-4 py-3
                                                    text-sm text-gray-700
                                                    transition
                                                    hover:bg-gray-50
                                                    hover:text-gray-950
                                                "
                                            >
                                                <Heart
                                                    size={16}
                                                    strokeWidth={1.7}
                                                />

                                                Wishlist
                                            </Link>

                                            {/* Logout */}
                                            <div className="border-t border-gray-100 p-2">

                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="
                                                        flex w-full
                                                        items-center gap-3
                                                        rounded-xl
                                                        px-3 py-3
                                                        text-left
                                                        text-sm text-gray-500
                                                        transition
                                                        hover:bg-red-50
                                                        hover:text-red-500
                                                    "
                                                >
                                                    <LogOut
                                                        size={16}
                                                        strokeWidth={1.7}
                                                    />

                                                    Sign out
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Guest */
                                <Link
                                    href="/login"
                                    className="
                                        hidden h-10
                                        items-center
                                        rounded-full
                                        border border-gray-200
                                        px-4
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.15em]
                                        text-gray-700
                                        transition
                                        hover:border-gray-900
                                        hover:bg-gray-900
                                        hover:text-white
                                        md:flex
                                    "
                                >
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile menu */}
                            <button
                                type="button"
                                aria-label="Open menu"
                                onClick={() => setMenuOpen(true)}
                                className="
                                    ml-1 flex h-10 w-10
                                    items-center justify-center
                                    rounded-full text-gray-800
                                    transition
                                    hover:bg-gray-100
                                    md:hidden
                                "
                            >
                                <Menu
                                    size={21}
                                    strokeWidth={1.8}
                                />
                            </button>

                        </div>
                    </nav>
                </div>
            </header>

            {/* =====================================================
                MOBILE DRAWER
            ====================================================== */}

            <div
                className={`
                    fixed inset-0 z-[9999] md:hidden ${menuOpen ? "visible" : "invisible"}
                `}
            >

                {/* Backdrop */}
                <div
                    onClick={closeMenu}
                    className={`
                        absolute inset-0
                        bg-black/30
                        backdrop-blur-[3px]
                        transition-opacity duration-300
                        ${menuOpen
                            ? "opacity-100"
                            : "opacity-0"
                        }
                    `}
                />

                {/* Drawer */}
                <aside
                    className={`fixed right-0 top-0 z-[10000] flex h-full w-[88%] max-w-[390px] flex-col bg-[#fafaf9] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${menuOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                        }
                    `}
                >

                    {/* Drawer Header */}
                    <div
                        className="
                            flex h-20 shrink-0
                            items-center justify-between
                            border-b border-gray-200/70
                            px-5
                        "
                    >

                        <Link
                            href="/"
                            onClick={closeMenu}
                        >
                            <Image
                                src="/images/logo_header_png.png"
                                alt="Clothing store logo"
                                width={120}
                                height={50}
                                className="h-9 w-auto object-contain"
                            />
                        </Link>

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={closeMenu}
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-full
                                border border-gray-200
                                bg-white
                                text-gray-700
                                transition
                                hover:bg-gray-900
                                hover:text-white
                            "
                        >
                            <X
                                size={19}
                                strokeWidth={1.8}
                            />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-6 py-8">

                        {/* Explore */}
                        <p
                            className="
                                mb-5 text-[10px]
                                font-semibold uppercase
                                tracking-[0.25em]
                                text-gray-400
                            "
                        >
                            Explore
                        </p>

                        <div className="space-y-1">

                            <Link
                                href="/shop"
                                onClick={closeMenu}
                                className="
                                    group flex items-center
                                    justify-between
                                    py-3.5
                                    text-[17px]
                                    font-medium
                                    text-gray-900
                                "
                            >
                                <span>Shop</span>

                                <span
                                    className="
                                        text-gray-300
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                        group-hover:text-gray-900
                                    "
                                >
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/collections"
                                onClick={closeMenu}
                                className="
                                    group my-2 flex
                                    items-center justify-between
                                    rounded-2xl
                                    bg-gray-900
                                    px-5 py-4
                                    text-white
                                    shadow-sm
                                "
                            >
                                <div>
                                    <p
                                        className="
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.2em]
                                            text-gray-400
                                        "
                                    >
                                        Discover
                                    </p>

                                    <p className="mt-1 text-[17px] font-medium">
                                        Collections
                                    </p>
                                </div>

                                <span
                                    className="
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full
                                        bg-white/10
                                        text-lg
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="
                                    group flex items-center
                                    justify-between
                                    py-3.5
                                    text-[17px]
                                    font-medium
                                    text-gray-900
                                "
                            >
                                <span>About Us</span>

                                <span className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/track-order"
                                onClick={closeMenu}
                                className="
                                    group flex items-center
                                    justify-between
                                    py-3.5
                                    text-[17px]
                                    font-medium
                                    text-gray-900
                                "
                            >
                                <span>Track Order</span>

                                <span className="text-gray-300 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                        </div>

                        {/* Divider */}
                        <div className="my-7 h-px bg-gray-200" />

                        {/* Account */}
                        <p
                            className="
                                mb-4 text-[10px]
                                font-semibold uppercase
                                tracking-[0.25em]
                                text-gray-400
                            "
                        >
                            Your Account
                        </p>

                        <div className="space-y-1">

                            {/* Account */}
                            <Link
                                href="/account"
                                onClick={closeMenu}
                                className="
                                    flex items-center gap-4
                                    rounded-xl
                                    px-2 py-3.5
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-white
                                "
                            >
                                <span
                                    className="
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full bg-white
                                    "
                                >
                                    <User
                                        size={17}
                                        strokeWidth={1.7}
                                    />
                                </span>

                                Account
                            </Link>

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                onClick={closeMenu}
                                className="
                                    flex items-center gap-4
                                    rounded-xl
                                    px-2 py-3.5
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-white
                                "
                            >
                                <span
                                    className="
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full bg-white
                                    "
                                >
                                    <Heart
                                        size={17}
                                        strokeWidth={1.7}
                                    />
                                </span>

                                Wishlist
                            </Link>

                            {/* Compare */}
                            <Link
                                href="/compare"
                                onClick={closeMenu}
                                className="
                                    flex items-center gap-4
                                    rounded-xl
                                    px-2 py-3.5
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-white
                                "
                            >
                                <span
                                    className="
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full bg-white
                                    "
                                >
                                    <ArrowRightLeft
                                        size={17}
                                        strokeWidth={1.7}
                                    />
                                </span>

                                Compare
                            </Link>

                            {/* Shopping Bag */}
                            <button
                                type="button"
                                onClick={() => {
                                    closeMenu();

                                    setTimeout(
                                        () => setCartOpen(true),
                                        350
                                    );
                                }}
                                className="
                                    flex w-full
                                    items-center gap-4
                                    rounded-xl
                                    px-2 py-3.5
                                    text-sm font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-white
                                "
                            >
                                <span
                                    className="
                                        relative flex h-9 w-9
                                        items-center justify-center
                                        rounded-full bg-white
                                    "
                                >
                                    <ShoppingBag
                                        size={17}
                                        strokeWidth={1.7}
                                    />

                                    {cartCount > 0 && (
                                        <span
                                            className="
                                                absolute -right-1 -top-1
                                                flex h-4 w-4
                                                items-center justify-center
                                                rounded-full
                                                bg-gray-900
                                                text-[8px]
                                                font-bold
                                                text-white
                                            "
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </span>

                                Shopping Bag
                            </button>

                        </div>

                        {/* =================================================
                            MOBILE AUTH
                        ================================================= */}

                        <div className="mt-7 border-t border-gray-200 pt-7">

                            {loading ? (
                                <div
                                    className="
                                        h-12 w-full
                                        animate-pulse
                                        rounded-full
                                        bg-gray-200
                                    "
                                />
                            ) : isAuthenticated ? (
                                <>

                                    {/* User */}
                                    <div
                                        className="
                                            mb-4 rounded-2xl
                                            bg-white
                                            p-4
                                        "
                                    >
                                        <p
                                            className="
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.2em]
                                                text-gray-400
                                            "
                                        >
                                            Signed in as
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-900">
                                            {user?.name}
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>

                                    {/* Profile */}
                                    <Link
                                        href="/account/profile"
                                        onClick={closeMenu}
                                        className="
                                            flex w-full
                                            items-center
                                            justify-center
                                            rounded-full
                                            border border-gray-200
                                            py-3.5
                                            text-sm font-semibold
                                            text-gray-900
                                            transition
                                            hover:bg-white
                                        "
                                    >
                                        View Profile
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                            mt-3 flex w-full
                                            items-center
                                            justify-center gap-2
                                            rounded-full
                                            border border-red-100
                                            py-3.5
                                            text-sm font-semibold
                                            text-red-500
                                            transition
                                            hover:bg-red-50
                                        "
                                    >
                                        <LogOut
                                            size={16}
                                            strokeWidth={1.7}
                                        />

                                        Sign Out
                                    </button>

                                </>
                            ) : (
                                <>
                                    <p
                                        className="
                                            mb-4 text-center
                                            text-xs text-gray-400
                                        "
                                    >
                                        Already have an account?
                                    </p>

                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="
                                            flex w-full
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-gray-900
                                            py-3.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            hover:bg-black
                                        "
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className="
                                            mt-3 flex w-full
                                            items-center
                                            justify-center
                                            rounded-full
                                            border border-gray-200
                                            bg-white
                                            py-3.5
                                            text-sm
                                            font-semibold
                                            text-gray-900
                                            transition
                                            hover:border-gray-900
                                        "
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}

                        </div>

                    </nav>

                    {/* Bottom */}
                    <div
                        className="
                            shrink-0
                            border-t border-gray-200/70
                            bg-[#fafaf9]
                            p-6
                        "
                    >
                        <p
                            className="
                                text-center
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-gray-400
                            "
                        >
                            Curated for your style
                        </p>
                    </div>

                </aside>
            </div>

            {/* Cart */}
            <CartSidebar
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
            />
        </>
    );
};

export default Header;