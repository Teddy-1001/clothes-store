"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";

export default function SearchBar({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 bg-white">
            <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                {/* Search icon */}
                <Search
                    size={20}
                    strokeWidth={1.5}
                    className="mr-5 shrink-0 text-gray-400"
                />

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for shoes, bags, accessories..."
                    className="
                        min-w-0 flex-1
                        bg-transparent
                        text-lg font-medium
                        text-gray-900
                        outline-none
                        placeholder:text-gray-300
                        md:text-2xl
                    "
                />

                {/* Search action */}
                {query && (
                    <button
                        type="button"
                        className="
                            mr-3 hidden
                            items-center gap-2
                            rounded-full
                            bg-gray-900
                            px-5 py-2.5
                            text-xs font-semibold
                            text-white
                            transition
                            hover:bg-black
                            sm:flex
                        "
                    >
                        Search
                        <ArrowRight size={14} />
                    </button>
                )}

                {/* Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close search"
                    className="
                        flex h-10 w-10
                        shrink-0 items-center justify-center
                        rounded-full
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                    "
                >
                    <X size={20} strokeWidth={1.5} />
                </button>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gray-200" />
        </div>
    );
}