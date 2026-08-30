"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ShoppingBag,
    Minus,
    Plus,
    Trash2,
    X,
    Truck,
    Check,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const FREE_SHIPPING_THRESHOLD = 5000;

const CartSidebar = ({ cartOpen, setCartOpen }) => {
    const {
        cart,
        cartCount,
        subtotal,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

    return (
        <div
            className={`fixed inset-0 z-[60] ${cartOpen ? "visible" : "invisible"
                }`}
        >
            {/* Backdrop */}
            <div
                onClick={() => setCartOpen(false)}
                className={`absolute inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`absolute right-0 top-0 flex h-full w-[92%] max-w-md flex-col bg-[#fafaf9] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${cartOpen
                    ? "translate-x-0"
                    : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200/70 px-6">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                            Your selection
                        </p>

                        <h2 className="mt-1 text-xl font-semibold text-gray-900">
                            Shopping Bag

                            {cartCount > 0 && (
                                <span className="ml-2 text-sm font-normal text-gray-400">
                                    ({cartCount})
                                </span>
                            )}
                        </h2>
                    </div>

                    <button
                        type="button"
                        aria-label="Close shopping bag"
                        onClick={() => setCartOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-900 hover:text-white"
                    >
                        <X
                            size={19}
                            strokeWidth={1.8}
                        />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                {cart.length > 0 && (
                    <div className="shrink-0 border-b border-gray-200/70 px-6 py-4">
                        {amountToFreeShipping > 0 ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <Truck size={14} className="text-gray-400" />
                                    <p className="text-xs text-gray-500">
                                        You&apos;re <span className="font-semibold text-gray-900">KSh {amountToFreeShipping.toLocaleString()}</span> away from free delivery!
                                    </p>
                                </div>

                                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-gray-900 transition-all duration-700 ease-out progress-fill"
                                        style={{ width: `${shippingProgress}%` }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                                    <Check size={12} className="text-emerald-600" />
                                </div>
                                <p className="text-xs font-medium text-emerald-700">
                                    You qualify for free delivery! 🎉
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {cart.length === 0 ? (
                        /* Empty Cart */
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                                <ShoppingBag
                                    size={30}
                                    strokeWidth={1.3}
                                    className="text-gray-400"
                                />
                            </div>

                            <h3 className="mt-6 text-lg font-semibold text-gray-900">
                                Your bag is empty
                            </h3>

                            <p className="mt-2 max-w-[260px] text-sm leading-6 text-gray-500">
                                Discover something you love and add it to your
                                shopping bag.
                            </p>

                            <Link
                                href="/shop"
                                onClick={() => setCartOpen(false)}
                                className="mt-7 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        /* Cart Products */
                        <div className="space-y-6">
                            {cart.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 cart-item-enter"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Product Image */}
                                    <Link
                                        href={`/shop/${item.slug}`}
                                        onClick={() => setCartOpen(false)}
                                        className="relative h-28 w-22 shrink-0 overflow-hidden rounded-xl bg-gray-100"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="88px"
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </h3>

                                                {item.category && (
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {item.category}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Remove */}
                                            <button
                                                type="button"
                                                aria-label={`Remove ${item.name}`}
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="shrink-0 rounded-full p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                            >
                                                <Trash2
                                                    size={14}
                                                    strokeWidth={1.7}
                                                />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <p className="mt-2 text-sm font-semibold text-gray-900">
                                            KSh{" "}
                                            {Number(item.price).toLocaleString()}
                                        </p>

                                        {/* Quantity */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center rounded-full border border-gray-200 bg-white">
                                                <button
                                                    type="button"
                                                    aria-label="Decrease quantity"
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:text-gray-900"
                                                >
                                                    <Minus size={13} />
                                                </button>

                                                <span className="w-7 text-center text-xs font-semibold text-gray-900">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label="Increase quantity"
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:text-gray-900"
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <p className="text-sm font-semibold text-gray-900">
                                                KSh{" "}
                                                {(
                                                    Number(item.price) *
                                                    item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-gray-200/70 bg-[#fafaf9] px-6 py-5">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Subtotal</span>

                        <span className="text-base font-semibold text-gray-900">
                            KSh {Number(subtotal).toLocaleString()}
                        </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-gray-400">
                        Taxes and shipping calculated at checkout.
                    </p>

                    <Link
                        href="/cart"
                        onClick={() => setCartOpen(false)}
                        className="mt-5 flex w-full items-center justify-center rounded-full bg-gray-900 py-4 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        View Shopping Bag
                    </Link>

                    <Link
                        href="/shop"
                        onClick={() => setCartOpen(false)}
                        className="mt-3 flex w-full items-center justify-center py-2 text-xs font-medium text-gray-500 transition hover:text-gray-900"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default CartSidebar;