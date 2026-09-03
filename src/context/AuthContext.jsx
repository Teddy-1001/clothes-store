"use client"

import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true)

            const res = await fetch("/api/auth/me", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            })

            if (!res.ok) {
                setUser(null)
                return null
            }

            const data = await res.json()

            setUser(data.user)
            console.log(user)

            return data.user
        } catch (error) {
            console.error("Fetch user error:", error);

            setUser(null);

            return null;
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    const login = useCallback(async (email, password, remember = false) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                    remember,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || "Login failed.",
                };
            }

            setUser(data.user);
            console.log(user)

            return {
                success: true,
                user: data.user,
            };

        } catch (error) {
            console.error("Login error:", error);

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    }, []);



    const logout = useCallback(async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            })
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            router.push("/login");
        }
    }, [router])


    const refreshUser = useCallback(() => {
        return fetchUser();
    }, [fetchUser]);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}