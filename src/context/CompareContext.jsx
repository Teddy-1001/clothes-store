"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
    const [compare, setCompare] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("compare");

        if (saved) {
            try {
                setCompare(JSON.parse(saved));
            } catch {
                localStorage.removeItem("compare");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "compare",
            JSON.stringify(compare)
        );
    }, [compare]);

    const addToCompare = useCallback((product) => {
        setCompare((current) => {
            if (
                current.some(
                    (item) => item.id === product.id
                )
            ) {
                return current;
            }

            // Keep comparison manageable
            if (current.length >= 4) {
                return current;
            }

            return [...current, product];
        });
    }, []);

    const removeFromCompare = useCallback((productId) => {
        setCompare((current) =>
            current.filter(
                (item) => item.id !== productId
            )
        );
    }, []);

    const toggleCompare = useCallback((product) => {
        setCompare((current) => {
            const exists = current.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return current.filter(
                    (item) => item.id !== product.id
                );
            }

            if (current.length >= 4) {
                return current;
            }

            return [...current, product];
        });
    }, []);

    const isInCompare = useCallback(
        (productId) => {
            return compare.some(
                (item) => item.id === productId
            );
        },
        [compare]
    );

    const clearCompare = useCallback(() => {
        setCompare([]);
    }, []);

    const compareCount = useMemo(
        () => compare.length,
        [compare]
    );

    const value = {
        compare,
        compareCount,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
    };

    return (
        <CompareContext.Provider value={value}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);

    if (!context) {
        throw new Error(
            "useCompare must be used inside CompareProvider"
        );
    }

    return context;
};