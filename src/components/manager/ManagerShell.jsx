"use client";

import {
    Boxes,
    ChevronLeft,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Package,
    Settings,
    ShoppingBag,
    Store,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    {
        name: "Dashboard",
        href: "/manager",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        href: "/manager/products",
        icon: Package,
    },
    {
        name: "Orders",
        href: "/manager/orders",
        icon: ShoppingBag,
    },
    {
        name: "Inventory",
        href: "/manager/inventory",
        icon: Boxes,
    },
    {
        name: "Messages",
        href: "/manager/messages",
        icon: MessageSquare,
    },
];

export default function ManagerShell({ user, children }) {
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            window.location.href = "/manager/login";
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f7f5] text-[#171717]">
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-black/10 bg-white lg:block">
                <div className="flex h-full flex-col">
                    <div className="flex h-20 items-center border-b border-black/10 px-6">
                        <Link href="/manager" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111] text-white">
                                <Store size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-wide">
                                    MASANGALA
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                    Manager
                                </p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-1 px-4 py-6">
                        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                            Management
                        </p>

                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active =
                                item.href === "/manager"
                                    ? pathname === "/manager"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-[#111] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"}`}
                                >
                                    <Icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}

                        <div className="my-6 border-t border-black/10" />

                        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                            Store
                        </p>

                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
                        >
                            <ChevronLeft size={18} />
                            Back to Store
                        </Link>

                        <Link
                            href="/account/settings"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
                        >
                            <Settings size={18} />
                            Settings
                        </Link>
                    </nav>

                    <div className="border-t border-black/10 p-4">
                        <div className="mb-3 px-3">
                            <p className="truncate text-sm font-medium">
                                {user?.name || "Manager"}
                            </p>
                            <p className="truncate text-xs text-gray-400">
                                {user?.email}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            <main className="min-h-screen lg:pl-64">{children}</main>
        </div>
    );
}
