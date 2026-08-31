"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Star,
    Tag,
    Truck,
    RotateCcw,
    ShieldCheck,
    ChevronDown,
    Share2,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const ProductDetails = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const [selectedColor, setSelectedColor] = useState(
        product.colors?.[0] || null
    );

    const [quantity, setQuantity] = useState(1);

    const [liked, setLiked] = useState(false);

    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0] || product.image
    );

    const [openAccordion, setOpenAccordion] = useState("description");

    const { addToCart, setCartOpen } = useCart();

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };


    const handleAddToCart = () => {
        if (product.sizes?.length > 0 && !selectedSize) return;

        const cartProduct = {
            ...product,
            selectedSize,
            selectedColor,
        };
        addToCart(cartProduct, quantity);
        setCartOpen(true);
    };

    const discount =
        product.oldPrice && product.price
            ? Math.round(
                ((product.oldPrice - product.price) /
                    product.oldPrice) *
                100
            )
            : 0;

    const productImages = product.images?.length
        ? product.images
        : [product.image];

    const accordionItems = [
        {
            id: "description",
            title: "Description",
            content: product.description,
        },
        {
            id: "shipping",
            title: "Shipping & Delivery",
            content: "We deliver countrywide across Kenya. Orders over KSh 5,000 qualify for free delivery. Standard delivery takes 2-5 business days depending on your location.",
        },
        {
            id: "returns",
            title: "Returns & Exchanges",
            content: "We offer easy returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us via WhatsApp to initiate a return.",
        },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa]">

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <div className="mx-auto max-w-7xl px-6 pt-7">
                <div className="flex items-center justify-between">
                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2
                        text-xs font-medium uppercase tracking-wider
                        text-gray-400 transition-colors duration-300
                        hover:text-gray-950"
                    >
                        <ArrowLeft
                            size={15}
                            className="transition-transform duration-300
                            group-hover:-translate-x-1"
                        />

                        Back to shop
                    </Link>

                    {/* Share Button */}
                    <button
                        type="button"
                        aria-label="Share product"
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: product.name,
                                    url: window.location.href,
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                            }
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-900 hover:text-white"
                    >
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            {/* =====================================================
                PRODUCT SECTION
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-8 lg:py-14">

                <div
                    className="grid grid-cols-1
                    gap-10
                    lg:grid-cols-[1.05fr_0.95fr]
                    lg:gap-16
                    xl:gap-24"
                >

                    {/* =================================================
                        PRODUCT GALLERY
                    ================================================= */}

                    <div className="relative animate-fade-in">

                        {/* Main Image */}

                        <div
                            className="group relative aspect-[4/5]
                            overflow-hidden rounded-2xl
                            bg-gray-100"
                        >
                            <Image
                                src={selectedImage}
                                alt={product.alt}
                                fill
                                priority
                                className="object-cover
                                transition-transform
                                duration-1000
                                ease-out
                                group-hover:scale-[1.03]"
                            />

                            {/* Soft Gradient */}

                            <div
                                className="pointer-events-none
                                absolute inset-0
                                bg-gradient-to-t
                                from-black/10
                                via-transparent
                                to-transparent"
                            />

                            {/* Sale Badge */}

                            {product.oldPrice && (
                                <div
                                    className="absolute left-5 top-5
                                    flex items-center gap-2
                                    rounded-full
                                    bg-gray-900
                                    px-4 py-2
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white
                                    shadow-sm"
                                >
                                    <Tag size={12} />
                                    -{discount}% Off
                                </div>
                            )}

                            {/* Wishlist */}

                            <button
                                type="button"
                                aria-label={
                                    liked
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                onClick={() => setLiked(!liked)}
                                className={`absolute right-5 top-5
                                flex h-11 w-11
                                items-center justify-center
                                rounded-full
                                bg-white/90
                                shadow-sm
                                backdrop-blur-md
                                transition-all duration-300
                                hover:scale-105
                                ${liked
                                        ? "text-red-500"
                                        : "text-gray-700 hover:text-red-500"
                                    }`}
                            >
                                <Heart
                                    size={18}
                                    fill={
                                        liked
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </button>
                        </div>

                        {/* =================================================
                            IMAGE THUMBNAILS
                        ================================================== */}

                        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">

                            {productImages.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() =>
                                        setSelectedImage(image)
                                    }
                                    className={`group relative
                                    h-24 w-20 shrink-0
                                    overflow-hidden
                                    rounded-lg
                                    border-2
                                    transition-all duration-300
                                    ${selectedImage === image
                                            ? "border-gray-950"
                                            : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} view ${index + 1
                                            }`}
                                        fill
                                        className="object-cover
                                        transition-transform
                                        duration-500
                                        group-hover:scale-105"
                                    />

                                    {/* Active overlay */}

                                    {selectedImage === image && (
                                        <div
                                            className="pointer-events-none
                                            absolute inset-0
                                            ring-1
                                            ring-inset
                                            ring-white/40"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Gallery Caption */}

                        <div
                            className="mt-4
                            flex items-center
                            justify-between"
                        >
                            <p
                                className="text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.2em]
                                text-gray-400"
                            >
                                Premium footwear
                            </p>

                            <span
                                className="text-[10px]
                                text-gray-400"
                            >
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================== */}

                    <div className="flex flex-col justify-center animate-slide-in-right">

                        {/* Category */}

                        {product.brand && (
                            <p className="text-sm font-medium text-gray-500">
                                {product.brand}
                            </p>
                        )}

                        <div
                            className={`inline-flex w-fit
                            items-center gap-2
                            rounded-full
                            border border-gray-200
                            bg-white
                            px-3 py-1.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-gray-500
                            ${product.brand ? "mt-3" : ""}`}
                        >
                            <Tag size={12} />

                            {product.category}
                        </div>

                        {/* Product Name */}

                        <h1
                            className="mt-5
                            max-w-xl
                            text-4xl
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.03em]
                            text-gray-950
                            md:text-5xl
                            lg:text-[52px]"
                        >
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.rating > 0 && (
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={15}
                                            fill={
                                                i < Math.floor(product.rating)
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                            className={
                                                i < Math.floor(product.rating)
                                                    ? "text-amber-400"
                                                    : "text-gray-200"
                                            }
                                        />
                                    ))}

                                    <span className="ml-1 text-sm font-semibold text-gray-900">
                                        {product.rating}
                                    </span>
                                </div>

                                {product.reviews > 0 && (
                                    <>
                                        <span className="h-4 w-px bg-gray-200" />
                                        <span className="text-xs text-gray-400">
                                            {product.reviews} customer reviews
                                        </span>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Price */}

                        <div
                            className="mt-7
                            flex flex-wrap
                            items-end gap-3"
                        >
                            <span
                                className="text-3xl
                                font-semibold
                                tracking-tight
                                text-gray-950"
                            >
                                KSh{" "}
                                {product.price.toLocaleString()}
                            </span>

                            {product.oldPrice && (
                                <>
                                    <span
                                        className="mb-1
                                        text-sm
                                        text-gray-400
                                        line-through"
                                    >
                                        KSh{" "}
                                        {product.oldPrice.toLocaleString()}
                                    </span>

                                    <span
                                        className="mb-1
                                        rounded-full
                                        bg-emerald-50
                                        px-2.5 py-1
                                        text-[10px]
                                        font-semibold
                                        text-emerald-700"
                                    >
                                        SAVE {discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}

                        <p
                            className="mt-6
                            max-w-xl
                            text-sm
                            leading-7
                            text-gray-500"
                        >
                            {product.description}
                        </p>

                        {/* Divider */}

                        <div
                            className="my-8
                            h-px bg-gray-200"
                        />

                        {/* =================================================
                            COLOR
                        ================================================== */}

                        {product.colors?.length > 0 && (
                            <div>

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p
                                            className="text-sm
                                            font-semibold
                                            text-gray-900"
                                        >
                                            Color
                                        </p>

                                        <p
                                            className="mt-1
                                            text-xs
                                            text-gray-400"
                                        >
                                            Selected: {selectedColor}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="mt-4
                                    flex flex-wrap gap-2"
                                >
                                    {product.colors.map(
                                        (color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedColor(
                                                        color
                                                    )
                                                }
                                                className={`rounded-full
                                                px-5 py-2.5
                                                text-xs
                                                font-medium
                                                transition-all
                                                duration-300
                                                ${selectedColor ===
                                                        color
                                                        ? "bg-gray-950 text-white shadow-md"
                                                        : "border border-gray-200 bg-white text-gray-600 hover:border-gray-900"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* =================================================
                            SIZE
                        ================================================== */}

                        {product.sizes?.length > 0 && (
                            <div className="mt-8">

                                <div
                                    className="flex
                                    items-center
                                    justify-between"
                                >
                                    <div>
                                        <p
                                            className="text-sm
                                            font-semibold
                                            text-gray-900"
                                        >
                                            Select Size
                                        </p>
                                        {selectedSize && (
                                            <p className="mt-1 text-xs text-gray-400">
                                                EU {selectedSize}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="text-xs
                                        font-medium
                                        text-gray-400
                                        underline
                                        underline-offset-4
                                        transition
                                        hover:text-gray-900"
                                    >
                                        Size Guide
                                    </button>
                                </div>

                                <div
                                    className="mt-4
                                    grid
                                    grid-cols-4
                                    gap-2
                                    sm:grid-cols-6"
                                >
                                    {product.sizes.map(
                                        (size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedSize(
                                                        size
                                                    )
                                                }
                                                className={`h-12
                                                rounded-md
                                                text-sm
                                                font-medium
                                                transition-all
                                                duration-300
                                                ${selectedSize ===
                                                        size
                                                        ? "bg-gray-950 text-white shadow-md"
                                                        : "border border-gray-200 bg-white text-gray-700 hover:border-gray-950"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        )
                                    )}
                                </div>

                                {/* Size not selected warning */}
                                {product.sizes?.length > 0 && !selectedSize && (
                                    <p className="mt-3 text-xs text-amber-600">
                                        Please select a size to continue
                                    </p>
                                )}
                            </div>
                        )}

                        {/* =================================================
                            QUANTITY + CART
                        ================================================== */}

                        <div className="mt-8 flex gap-2">

                            {/* Quantity */}

                            <div
                                className="flex h-14
                                shrink-0
                                items-center
                                rounded-md
                                border
                                border-gray-200
                                bg-white"
                            >
                                <button
                                    type="button"
                                    onClick={decreaseQuantity}
                                    className="flex h-full w-11
                                    items-center
                                    justify-center
                                    text-gray-400
                                    transition
                                    hover:text-gray-900"
                                >
                                    <Minus size={15} />
                                </button>

                                <span
                                    className="w-8
                                    text-center
                                    text-sm
                                    font-semibold
                                    text-gray-900"
                                >
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={increaseQuantity}
                                    className="flex h-full w-11
                                    items-center
                                    justify-center
                                    text-gray-400
                                    transition
                                    hover:text-gray-900"
                                >
                                    <Plus size={15} />
                                </button>
                            </div>

                            {/* Add To Cart */}

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={
                                    !product.inStock ||
                                    (product.sizes?.length > 0 && !selectedSize)
                                }
                                className="group flex h-14
                                flex-1
                                items-center
                                justify-center
                                gap-3
                                rounded-md
                                bg-gray-950
                                px-6
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-gray-800
                                disabled:cursor-not-allowed
                                disabled:bg-gray-200
                                disabled:text-gray-400"
                            >
                                <ShoppingBag
                                    size={17}
                                    className="transition-transform
                                    duration-300
                                    group-hover:-translate-y-0.5"
                                />

                                {!product.inStock
                                    ? "Out of Stock"
                                    : product.sizes?.length > 0 && !selectedSize
                                      ? "Select a Size"
                                      : `Add to Cart — KSh ${(product.price * quantity).toLocaleString()}`}
                            </button>
                        </div>

                        {/* =================================================
                            ACCORDION
                        ================================================== */}

                        <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                            {accordionItems.map((item) => (
                                <div key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenAccordion(
                                                openAccordion === item.id ? null : item.id
                                            )
                                        }
                                        className="flex w-full items-center justify-between py-5 text-sm font-semibold text-gray-900 transition hover:text-gray-600"
                                    >
                                        {item.title}
                                        <ChevronDown
                                            size={16}
                                            className={`text-gray-400 transition-transform duration-300 ${openAccordion === item.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${openAccordion === item.id
                                            ? "max-h-40 pb-5 opacity-100"
                                            : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="text-sm leading-7 text-gray-500">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* =================================================
                            BENEFITS
                        ================================================== */}

                        <div
                            className="mt-10
                            grid grid-cols-1
                            gap-3
                            sm:grid-cols-3"
                        >

                            {/* Delivery */}

                            <div
                                className="rounded-lg
                                border border-gray-100
                                bg-white
                                p-4
                                transition
                                hover:border-gray-200
                                hover:shadow-sm"
                            >
                                <Truck
                                    size={18}
                                    className="text-gray-900"
                                />

                                <p
                                    className="mt-3
                                    text-xs
                                    font-semibold
                                    text-gray-900"
                                >
                                    Countrywide Delivery
                                </p>

                                <p
                                    className="mt-1
                                    text-[11px]
                                    leading-5
                                    text-gray-400"
                                >
                                    Delivered straight to
                                    your door.
                                </p>
                            </div>

                            {/* Returns */}

                            <div
                                className="rounded-lg
                                border border-gray-100
                                bg-white
                                p-4
                                transition
                                hover:border-gray-200
                                hover:shadow-sm"
                            >
                                <RotateCcw
                                    size={18}
                                    className="text-gray-900"
                                />

                                <p
                                    className="mt-3
                                    text-xs
                                    font-semibold
                                    text-gray-900"
                                >
                                    Easy Returns
                                </p>

                                <p
                                    className="mt-1
                                    text-[11px]
                                    leading-5
                                    text-gray-400"
                                >
                                    Shop confidently
                                    with easy returns.
                                </p>
                            </div>

                            {/* Security */}

                            <div
                                className="rounded-lg
                                border border-gray-100
                                bg-white
                                p-4
                                transition
                                hover:border-gray-200
                                hover:shadow-sm"
                            >
                                <ShieldCheck
                                    size={18}
                                    className="text-gray-900"
                                />

                                <p
                                    className="mt-3
                                    text-xs
                                    font-semibold
                                    text-gray-900"
                                >
                                    Secure Shopping
                                </p>

                                <p
                                    className="mt-1
                                    text-[11px]
                                    leading-5
                                    text-gray-400"
                                >
                                    Your purchase is
                                    safe and protected.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                STICKY MOBILE BOTTOM BAR
            ================================================== */}
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur-md px-4 py-3 lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            {product.name}
                        </p>
                        <p className="text-lg font-semibold text-gray-950">
                            KSh {(product.price * quantity).toLocaleString()}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={
                            !product.inStock ||
                            (product.sizes?.length > 0 && !selectedSize)
                        }
                        className="flex items-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400"
                    >
                        <ShoppingBag size={16} />
                        {!product.inStock
                            ? "Out of Stock"
                            : product.sizes?.length > 0 && !selectedSize
                              ? "Select Size"
                              : "Add to Bag"}
                    </button>
                </div>
            </div>

            {/* Spacer for sticky bar on mobile */}
            <div className="h-20 lg:hidden" />
        </main>
    );
};

export default ProductDetails;