"use client";

import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const Toast = () => {
    const { toast } = useCart();
    const [visible, setVisible] = useState(false);
    const [currentToast, setCurrentToast] = useState(null);

    useEffect(() => {
        if (toast) {
            setCurrentToast(toast);
            // Small delay to trigger CSS transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });

            const timer = setTimeout(() => {
                setVisible(false);
            }, 2600);

            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [toast]);

    if (!currentToast) return null;

    return (
        <div
            className={`fixed top-24 right-6 z-[100] 
                flex items-center gap-3 
                rounded-2xl border border-gray-100
                bg-white px-5 py-4 
                shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-[120%] opacity-0"
                }`}
            role="alert"
        >
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <Check size={18} strokeWidth={2.5} className="text-emerald-600" />
            </div>

            {/* Text */}
            <div className="pr-2">
                <p className="text-sm font-semibold text-gray-900">
                    {currentToast.message}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">
                    View your shopping bag →
                </p>
            </div>

            {/* Close */}
            <button
                type="button"
                onClick={() => setVisible(false)}
                className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-300 transition hover:bg-gray-100 hover:text-gray-600"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export default Toast;
