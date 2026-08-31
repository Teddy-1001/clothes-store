"use client"

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowUpRight, Star, Scale } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";

const ProductCard = ({ product }) => {

    const { addToCart, setCartOpen } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const {
    toggleCompare,
    isInCompare,
} = useCompare();

    const saved = isInWishlist(product.id)



    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setCartOpen(true);
    }



    const discount = product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0;

    return (
        <article className="group animate-fade-in-up">

            {/* Product Image — Links to product page */}
            <Link
                href={`/shop/${product.slug}`}
                className="group/image relative block w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100"
            >
                <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover
                     transition-transform duration-700 ease-out
                     group-hover:scale-105"
                />

                {/* Soft Image Overlay */}
                <div
                    className="absolute inset-0
                     bg-gradient-to-t
                     from-black/40 via-transparent to-transparent
                     opacity-0
                     transition-opacity duration-500
                     group-hover:opacity-100"
                />

                {/* Discount Badge */}
                {product.oldPrice && (
                    <span
                        className="absolute top-4 left-4
                       rounded-full
                       bg-gray-900
                       px-3 py-1.5
                       text-[10px]
                       font-semibold
                       uppercase
                       tracking-[0.1em]
                       text-white
                       shadow-sm"
                    >
                        -{discount}%
                    </span>
                )}

                {/* Wishlist */}
                <button
                    type="button"
                    aria-label={saved ? `Remove ${product.name} to wishlist` : `Add ${product.name} to wishlist`}
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4
                     flex h-10 w-10
                     items-center justify-center
                     rounded-full
                     bg-white/90
                     text-gray-700
                     shadow-sm
                     backdrop-blur-sm
                     opacity-0
                     scale-90
                     transition-all duration-300
                     group-hover:opacity-100
                     group-hover:scale-100
                     hover:bg-black
                     hover:text-white"
                >
                    <Heart size={17} strokeWidth={1.8} className={
                        saved
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                    } />
                </button>
                <button
    type="button"
    onClick={() => toggleCompare(product)}
    className={`rounded-full border p-3 transition-all ${
        isInCompare(product.id)
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-900"
    }`}
>
    <Scale size={15} />
</button>

                {/* Bottom Actions */}
                <div
                    className="absolute bottom-4 left-4 right-4
                     flex items-center gap-2
                     translate-y-4
                     opacity-0
                     transition-all duration-500
                     group-hover:translate-y-0
                     group-hover:opacity-100"
                >
                    {/* Add to Cart */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex flex-1
                       items-center justify-center
                       gap-2
                       rounded-lg
                       bg-white/95
                       py-3
                       text-xs
                       font-semibold
                       text-gray-900
                       shadow-lg
                       backdrop-blur-md
                       transition-all duration-300
                       hover:bg-black
                       hover:text-white"
                    >
                        <ShoppingBag size={15} strokeWidth={1.8} />
                        Add to Bag
                    </button>

                    {/* Product Details */}
                    <span
                        className="flex h-11 w-11
                       shrink-0
                       items-center justify-center
                       rounded-lg
                       bg-black/90
                       text-white
                       shadow-lg
                       backdrop-blur-md
                       transition-all duration-300
                       hover:bg-white
                       hover:text-gray-900"
                    >
                        <ArrowUpRight size={17} strokeWidth={1.8} />
                    </span>
                </div>
            </Link>

            {/* Product Information */}
            <div className="pt-4">

                {/* Category */}
                <p
                    className="text-[10px]
                     font-semibold
                     uppercase
                     tracking-[0.2em]
                     text-gray-400"
                >
                    {product.brand || product.category}
                </p>

                {/* Product Name */}
                <h3>
                    <Link
                        href={`/shop/${product.slug}`}
                        className="mt-1.5
                     block text-base
                     font-semibold
                     tracking-tight
                     text-gray-900
                     transition hover:text-gray-600"
                    >
                        {product.name}
                    </Link>
                </h3>

                {/* Rating */}
                {product.rating > 0 && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={11}
                                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                    className={
                                        i < Math.floor(product.rating)
                                            ? "text-amber-400"
                                            : "text-gray-200"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-gray-400">
                            ({product.reviews})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">

                    <span className="text-sm font-semibold text-gray-900">
                        KSh {product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                        <span
                            className="text-xs
                         text-gray-400
                         line-through"
                        >
                            KSh {product.oldPrice.toLocaleString()}
                        </span>
                    )}

                </div>

                {/* Color Dots */}
                {product.colors?.length > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                        {product.colors.map((color) => (
                            <span
                                key={color}
                                title={color}
                                className="h-3.5 w-3.5 rounded-full border border-gray-200 shadow-sm"
                                style={{
                                    backgroundColor:
                                        color.toLowerCase() === "black" ? "#1f2937" :
                                            color.toLowerCase() === "white" ? "#f9fafb" :
                                                color.toLowerCase() === "brown" ? "#92400e" :
                                                    color.toLowerCase() === "grey" || color.toLowerCase() === "gray" ? "#9ca3af" :
                                                        color.toLowerCase() === "cream" ? "#fef3c7" :
                                                            color.toLowerCase() === "red" ? "#ef4444" :
                                                                color.toLowerCase() === "nude" ? "#d4a574" :
                                                                    "#e5e7eb"
                                }}
                            />
                        ))}
                    </div>
                )}

            </div>
        </article>
    );
};

export default ProductCard;