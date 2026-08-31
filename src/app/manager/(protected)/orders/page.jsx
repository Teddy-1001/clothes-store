"use client";

import { useEffect, useState } from "react";
import {
    Search,
    ShoppingBag,
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

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("/api/orders");

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const query = search.toLowerCase();

        return (
            order.orderNumber?.toLowerCase().includes(query) ||
            order.customer?.toLowerCase().includes(query) ||
            order.email?.toLowerCase().includes(query) ||
            order.product?.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <header className="border-b border-black/10 bg-white">
                <div className="px-6 py-5 lg:px-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                        Store
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold">
                        Orders
                    </h1>
                </div>
            </header>

            <div className="p-6 lg:p-10">
                <div className="rounded-2xl border border-black/10 bg-white">
                    <div className="flex flex-col gap-4 border-b border-black/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative max-w-sm flex-1">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search orders..."
                                className="w-full rounded-xl border border-black/10 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
                            />
                        </div>

                        <p className="text-sm text-gray-500">
                            {filteredOrders.length} orders
                        </p>
                    </div>

                    {loading ? (
                        <div className="p-10 text-center text-sm text-gray-500">
                            Loading orders...
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="p-10 text-center text-sm text-gray-500">
                            {orders.length === 0
                                ? "No orders yet."
                                : "No orders match your search."}
                        </div>
                    ) : (
                        <div className="divide-y divide-black/10">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                                            <ShoppingBag size={19} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {order.orderNumber}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {order.customer} · {order.product}
                                                {order.itemCount > 1
                                                    ? ` +${order.itemCount - 1} more`
                                                    : ""}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {order.date}
                                                {order.email
                                                    ? ` · ${order.email}`
                                                    : ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                                        <div className="text-right">
                                            <p className="text-sm font-semibold">
                                                KSh{" "}
                                                {order.amount.toLocaleString()}
                                            </p>

                                            <p
                                                className={`mt-1 text-xs ${orderStatusColor(order.status)}`}
                                            >
                                                {order.statusLabel}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="text-gray-400"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
