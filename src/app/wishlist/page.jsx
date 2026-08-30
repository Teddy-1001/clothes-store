"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    Heart,
    ShoppingBag,
    Trash2,
} from "lucide-react";

import Header from "@/components/Header";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
    const {
        wishlist,
        wishlistCount,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">

            <Header />

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                        Saved For Later
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-6">

                        <div>
                            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
                                Wishlist
                            </h1>

                            <p className="mt-5 text-sm text-gray-500">
                                {wishlistCount}{" "}
                                {wishlistCount === 1
                                    ? "item"
                                    : "items"}{" "}
                                saved for you.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="
                                hidden items-center gap-2
                                text-xs font-semibold uppercase
                                tracking-wider text-gray-500
                                transition hover:text-gray-900
                                sm:flex
                            "
                        >
                            <ArrowLeft size={14} />
                            Continue Shopping
                        </Link>

                    </div>
                </div>
            </section>

            {/* Wishlist */}
            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                {wishlist.length === 0 ? (

                    /* Empty Wishlist */
                    <div className="
                        flex min-h-[450px]
                        flex-col items-center
                        justify-center
                        text-center
                    ">

                        <div className="
                            flex h-20 w-20
                            items-center justify-center
                            rounded-full bg-white
                            shadow-sm
                        ">
                            <Heart
                                size={28}
                                strokeWidth={1.3}
                                className="text-gray-400"
                            />
                        </div>

                        <h2 className="mt-7 text-2xl font-semibold">
                            Your wishlist is empty
                        </h2>

                        <p className="
                            mt-3 max-w-sm
                            text-sm leading-6
                            text-gray-500
                        ">
                            Save the shoes you love and come back
                            to them whenever you're ready.
                        </p>

                        <Link
                            href="/shop"
                            className="
                                group mt-8
                                inline-flex items-center gap-3
                                rounded-full bg-gray-900
                                px-7 py-4
                                text-sm font-semibold text-white
                                transition-all duration-300
                                hover:bg-black
                            "
                        >
                            Explore Shoes

                            <ArrowRight
                                size={15}
                                className="
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>

                    </div>

                ) : (

                    /* Products */
                    <div className="
                        grid grid-cols-2
                        gap-x-4 gap-y-12
                        sm:gap-x-6
                        md:grid-cols-3
                        lg:grid-cols-4
                        lg:gap-x-7
                    ">

                        {wishlist.map((product) => (

                            <article
                                key={product.id}
                                className="group"
                            >

                                {/* Image */}
                                <div className="
                                    relative aspect-[4/5]
                                    overflow-hidden
                                    rounded-3xl
                                    bg-gray-100
                                ">

                                    <Image
                                        src={product.image}
                                        alt={product.alt || product.name}
                                        fill
                                        className="
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105
                                        "
                                    />

                                    {/* Remove */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromWishlist(
                                                product.id
                                            )
                                        }
                                        className="
                                            absolute right-3 top-3
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-full
                                            bg-white/95
                                            text-gray-700
                                            shadow-sm
                                            backdrop-blur
                                            transition
                                            hover:bg-red-500
                                            hover:text-white
                                        "
                                        aria-label="Remove from wishlist"
                                    >
                                        <Trash2
                                            size={15}
                                            strokeWidth={1.7}
                                        />
                                    </button>

                                    {/* Sale */}
                                    {product.oldPrice && (
                                        <span className="
                                            absolute bottom-3 left-3
                                            rounded-full
                                            bg-white/95
                                            px-3 py-1.5
                                            text-[9px]
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                        ">
                                            Sale
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="pt-5">

                                    <p className="
                                        text-[9px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-gray-400
                                    ">
                                        {product.category}
                                    </p>

                                    <h2 className="
                                        mt-2
                                        text-sm
                                        font-semibold
                                    ">
                                        {product.name}
                                    </h2>

                                    <div className="
                                        mt-2 flex
                                        items-center gap-2
                                    ">

                                        <span className="
                                            text-sm
                                            font-semibold
                                        ">
                                            KSh{" "}
                                            {product.price.toLocaleString()}
                                        </span>

                                        {product.oldPrice && (
                                            <span className="
                                                text-xs
                                                text-gray-400
                                                line-through
                                            ">
                                                KSh{" "}
                                                {product.oldPrice.toLocaleString()}
                                            </span>
                                        )}

                                    </div>

                                    {/* Add to cart */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAddToCart(product)
                                        }
                                        className="
                                            mt-5 flex w-full
                                            items-center
                                            justify-center gap-2
                                            rounded-full
                                            border border-gray-200
                                            bg-white
                                            px-4 py-3
                                            text-xs
                                            font-semibold
                                            text-gray-900
                                            transition-all
                                            duration-300
                                            hover:border-gray-900
                                            hover:bg-gray-900
                                            hover:text-white
                                        "
                                    >
                                        <ShoppingBag size={14} />

                                        Add to Cart
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}