"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage
    useEffect(() => {
        try {
            const savedWishlist = localStorage.getItem("wishlist");

            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error("Failed to load wishlist:", error);
        }
    }, []);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Add product
    const addToWishlist = useCallback((product) => {
        setWishlist((current) => {
            const exists = current.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return current;
            }

            return [...current, product];
        });
    }, []);

    // Remove product
    const removeFromWishlist = useCallback((productId) => {
        setWishlist((current) =>
            current.filter((item) => item.id !== productId)
        );
    }, []);

    // Check whether product is already saved
    const isInWishlist = useCallback(
        (productId) => {
            return wishlist.some(
                (item) => item.id === productId
            );
        },
        [wishlist]
    );

    // Add/remove product
    const toggleWishlist = useCallback((product) => {
        setWishlist((current) => {
            const exists = current.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return current.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...current, product];
        });
    }, []);

    // Remove everything
    const clearWishlist = useCallback(() => {
        setWishlist([]);
    }, []);

    // Number of saved products
    const wishlistCount = useMemo(
        () => wishlist.length,
        [wishlist]
    );

    const value = {
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );
    }

    return context;
};