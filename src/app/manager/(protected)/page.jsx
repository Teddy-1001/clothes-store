"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowUpRight,
    Package,
    ShoppingBag,
    TrendingUp,
    Users,
    Plus,
    ChevronRight,
} from "lucide-react";

function orderStatusColor(status) {
    switch (status) {
        case "completed":
            return "text-green-600";
        case "processing":
        case "pending":
            return "text-orange-600";
        case "shipped":
            return "text-blue-600";
        default:
            return "text-gray-500";
    }
}

function formatCurrency(amount) {
    return `KSh ${Number(amount || 0).toLocaleString()}`;
}

export default function ManagerDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        orderCount: 0,
        productCount: 0,
        customerCount: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await fetch("/api/manager/dashboard");

                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard");
                }

                const data = await response.json();
                setStats(data.stats);
                setRecentOrders(data.recentOrders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    const statCards = [
        {
            title: "Total Sales",
            value: formatCurrency(stats.totalSales),
            icon: TrendingUp,
        },
        {
            title: "Orders",
            value: stats.orderCount.toLocaleString(),
            icon: ShoppingBag,
        },
        {
            title: "Products",
            value: stats.productCount.toLocaleString(),
            icon: Package,
        },
        {
            title: "Customers",
            value: stats.customerCount.toLocaleString(),
            icon: Users,
        },
    ];

    return (
        <div>
            <header className="border-b border-black/10 bg-white">
                <div className="flex items-center justify-between px-6 py-5 lg:px-10">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                            Manager
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold">
                            Dashboard
                        </h1>
                    </div>

                    <Link
                        href="/manager/products/new"
                        className="flex items-center gap-2 rounded-xl bg-[#111] px-4 py-3 text-sm font-medium text-white transition hover:bg-black/80"
                    >
                        <Plus size={17} />
                        Add Product
                    </Link>
                </div>
            </header>

            <div className="space-y-8 p-6 lg:p-10">
                <section>
                    <h2 className="text-3xl font-semibold tracking-tight">
                        Good afternoon 👋
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Here&apos;s what&apos;s happening with your store today.
                    </p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-black/10 bg-white p-5"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                                    <Icon size={19} />
                                </div>

                                <p className="mt-6 text-sm text-gray-500">
                                    {stat.title}
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    {loading ? "—" : stat.value}
                                </p>
                            </div>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
                    <div className="rounded-2xl border border-black/10 bg-white">
                        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                            <div>
                                <h3 className="font-semibold">
                                    Recent Orders
                                </h3>

                                <p className="mt-1 text-xs text-gray-500">
                                    Latest customer orders
                                </p>
                            </div>

                            <Link
                                href="/manager/orders"
                                className="flex items-center gap-1 text-sm font-medium hover:underline"
                            >
                                View all
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>

                        {loading ? (
                            <div className="px-6 py-10 text-center text-sm text-gray-500">
                                Loading orders...
                            </div>
                        ) : recentOrders.length === 0 ? (
                            <div className="px-6 py-10 text-center text-sm text-gray-500">
                                No orders yet.
                            </div>
                        ) : (
                            <div className="divide-y divide-black/10">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="text-sm font-medium">
                                                {order.product}
                                                {order.itemCount > 1
                                                    ? ` +${order.itemCount - 1} more`
                                                    : ""}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {order.orderNumber} ·{" "}
                                                {order.customer}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-5">
                                            <div className="text-right">
                                                <p className="text-sm font-semibold">
                                                    {formatCurrency(
                                                        order.amount,
                                                    )}
                                                </p>

                                                <span
                                                    className={`text-xs ${orderStatusColor(order.status)}`}
                                                >
                                                    {order.statusLabel}
                                                </span>
                                            </div>

                                            <ChevronRight
                                                size={17}
                                                className="text-gray-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-[#111] p-6 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                            Quick Actions
                        </p>

                        <h3 className="mt-3 text-xl font-semibold">
                            Manage your store
                        </h3>

                        <div className="mt-6 space-y-2">
                            <Link
                                href="/manager/products/new"
                                className="flex items-center justify-between rounded-xl bg-white px-4 py-4 text-sm font-medium text-black"
                            >
                                Add new shoe
                                <Plus size={18} />
                            </Link>

                            <Link
                                href="/manager/products"
                                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-4 text-sm font-medium text-white hover:bg-white/15"
                            >
                                Manage products
                                <Package size={18} />
                            </Link>

                            <Link
                                href="/manager/inventory"
                                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-4 text-sm font-medium text-white hover:bg-white/15"
                            >
                                Check inventory
                                <TrendingUp size={18} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
