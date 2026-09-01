"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Check,
    CheckCircle,
    ChevronLeft,
    Clock3,
    Mail,
    MailOpen,
    MoreHorizontal,
    Search,
    Trash2,
    User,
} from "lucide-react";

const filters = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
    { label: "Replied", value: "replied" },
    { label: "Resolved", value: "resolved" },
];

export default function ManagerMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [mobileView, setMobileView] = useState("list");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [unreadCount, setUnreadCount] = useState(0);

    // reply
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch("/api/manager/messages");

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to load messages"
                    );
                }

                const loadedMessages = Array.isArray(data.messages)
                    ? data.messages
                    : [];

                setMessages(loadedMessages);
                setUnreadCount(data.unreadCount || 0);

                if (loadedMessages.length > 0) {
                    setSelectedMessage(loadedMessages[0]);
                } else {
                    setSelectedMessage(null);
                }
            } catch (error) {
                console.error("MESSAGES ERROR:", error);
                setError(error.message || "Failed to load messages");
                setMessages([]);
                setSelectedMessage(null);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, []);

    const handleMarkAsRead = async () => {
        if (!selectedMessage || selectedMessage.status === "read") {
            return;
        }

        try {
            const res = await fetch(
                `/api/manager/messages/${selectedMessage.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: "read"
                    })
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to mark message as read"
                );
            }

            const updatedMessage = data.message;

            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.id === updatedMessage.id
                        ? updatedMessage
                        : message
                )
            );

            setSelectedMessage(updatedMessage);

            setUnreadCount((count) => Math.max(0, count - 1));
        } catch (error) {
            console.error("MARK AS READ ERROR:", error);
        }
    };

    const handleSendReply = async () => {
        if (!selectedMessage || !replyText.trim() || sendingReply) {
            return;
        }

        try {
            setSendingReply(true);

            const res = await fetch(
                `/api/manager/messages/${selectedMessage.id}/reply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        reply: replyText.trim(),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to send reply"
                );
            }

            // IMPORTANT: Your API returns "updatedMessage"
            const updatedMessage = data.updatedMessage;

            if (!updatedMessage) {
                throw new Error(
                    "Reply was sent, but the updated message was not returned."
                );
            }

            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    message.id === updatedMessage.id
                        ? updatedMessage
                        : message
                )
            );

            setSelectedMessage(updatedMessage);

            setReplyOpen(false);
            setReplyText("");

            console.log("REPLY SENT:", data.message);
        } catch (error) {
            console.error("SEND REPLY ERROR:", error);

            alert(
                error.message || "Failed to send reply."
            );
        } finally {
            setSendingReply(false);
        }
    };

    const filteredMessages = useMemo(() => {
        const searchTerm = search.toLowerCase().trim();

        return messages.filter((message) => {
            const matchesFilter =
                activeFilter === "all" ||
                message.status === activeFilter;

            const matchesSearch =
                (message.name || "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (message.email || "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (message.subject || "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (message.message || "")
                    .toLowerCase()
                    .includes(searchTerm);

            return matchesFilter && matchesSearch;
        });
    }, [messages, activeFilter, search]);

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
        setMobileView("message");
    };

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="border-b border-neutral-200">
                <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                Customer service
                            </p>

                            <div className="mt-2 flex items-center gap-3">
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    Messages
                                </h1>

                                {unreadCount > 0 && (
                                    <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 text-sm text-neutral-500">
                                Manage customer enquiries and conversations.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <Search
                                size={17}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                            />

                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

                    {/* Filters */}
                    <div className="flex items-center gap-1 overflow-x-auto border-b border-neutral-200 px-3 py-3 sm:px-5">
                        {filters.map((filter) => {
                            const count =
                                filter.value === "all"
                                    ? messages.length
                                    : messages.filter(
                                        (message) =>
                                            message.status ===
                                            filter.value
                                    ).length;

                            return (
                                <button
                                    key={filter.value}
                                    onClick={() =>
                                        setActiveFilter(filter.value)
                                    }
                                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition ${activeFilter === filter.value
                                        ? "bg-black text-white"
                                        : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                                        }`}
                                >
                                    {filter.label}

                                    <span
                                        className={`text-[10px] ${activeFilter === filter.value
                                            ? "text-neutral-300"
                                            : "text-neutral-400"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Inbox */}
                    <div className="grid min-h-[680px] lg:grid-cols-[390px_1fr]">

                        {/* Message List */}
                        <div
                            className={`border-r border-neutral-200 ${mobileView === "message"
                                ? "hidden lg:block"
                                : "block"
                                }`}
                        >
                            <div className="border-b border-neutral-100 px-5 py-4">
                                <p className="text-xs font-medium text-neutral-400">
                                    {loading
                                        ? "Loading..."
                                        : `${filteredMessages.length} ${filteredMessages.length === 1
                                            ? "conversation"
                                            : "conversations"
                                        }`}
                                </p>
                            </div>

                            <div>
                                {loading ? (
                                    <div className="px-6 py-20 text-center">
                                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-black" />

                                        <p className="mt-4 text-sm font-medium">
                                            Loading messages...
                                        </p>
                                    </div>
                                ) : error ? (
                                    <div className="px-6 py-20 text-center">
                                        <p className="text-sm font-medium text-red-600">
                                            Failed to load messages
                                        </p>

                                        <p className="mt-2 text-xs text-neutral-400">
                                            {error}
                                        </p>
                                    </div>
                                ) : filteredMessages.length === 0 ? (
                                    <div className="px-6 py-20 text-center">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                                            <MailOpen
                                                size={19}
                                                className="text-neutral-400"
                                            />
                                        </div>

                                        <p className="mt-4 text-sm font-medium">
                                            No messages found
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-400">
                                            Try changing your search or filter.
                                        </p>
                                    </div>
                                ) : (
                                    filteredMessages.map((message) => (
                                        <button
                                            key={message.id}
                                            onClick={() =>
                                                handleSelectMessage(message)
                                            }
                                            className={`w-full border-b border-neutral-100 px-5 py-5 text-left transition hover:bg-neutral-50 ${selectedMessage?.id ===
                                                message.id
                                                ? "bg-neutral-50"
                                                : "bg-white"
                                                }`}
                                        >
                                            <div className="flex gap-3">

                                                {/* Avatar */}
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold">
                                                    {(message.name || "?")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <p
                                                                className={`truncate text-sm ${message.status ===
                                                                    "unread"
                                                                    ? "font-semibold"
                                                                    : "font-medium"
                                                                    }`}
                                                            >
                                                                {message.name ||
                                                                    "Unknown customer"}
                                                            </p>

                                                            {message.status ===
                                                                "unread" && (
                                                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                                                                )}
                                                        </div>

                                                        <span className="shrink-0 text-[10px] text-neutral-400">
                                                            {message.created_at
                                                                ? new Date(
                                                                    message.created_at
                                                                ).toLocaleString()
                                                                : ""}
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 truncate text-xs font-medium text-neutral-700">
                                                        {message.subject ||
                                                            "No subject"}
                                                    </p>

                                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400">
                                                        {message.message || ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Message Details */}
                        <div
                            className={`${mobileView === "list"
                                ? "hidden lg:block"
                                : "block"
                                }`}
                        >
                            {selectedMessage ? (
                                <div className="flex h-full flex-col">

                                    {/* Message Header */}
                                    <div className="border-b border-neutral-200 px-5 py-4 sm:px-7">
                                        <button
                                            onClick={() =>
                                                setMobileView("list")
                                            }
                                            className="mb-5 flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-black lg:hidden"
                                        >
                                            <ChevronLeft size={15} />
                                            Back to messages
                                        </button>

                                        <div className="flex items-start justify-between gap-5">
                                            <div className="flex min-w-0 gap-4">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                                                    {(selectedMessage.name ||
                                                        "?")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div className="min-w-0">
                                                    <h2 className="text-sm font-semibold">
                                                        {selectedMessage.subject ||
                                                            "No subject"}
                                                    </h2>

                                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                                                        <span>
                                                            {
                                                                selectedMessage.name
                                                            }
                                                        </span>

                                                        <span>•</span>

                                                        <span>
                                                            {
                                                                selectedMessage.email
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-black">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex-1 px-5 py-8 sm:px-7">
                                        <div className="max-w-3xl">

                                            <div className="mb-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                                                <Clock3 size={13} />

                                                {selectedMessage.created_at
                                                    ? new Date(
                                                        selectedMessage.created_at
                                                    ).toLocaleString()
                                                    : ""}
                                            </div>

                                            <p className="whitespace-pre-line text-sm leading-8 text-neutral-700">
                                                {selectedMessage.message}
                                            </p>

                                            {/* Customer */}
                                            <div className="mt-12 border-t border-neutral-200 pt-7">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                                                    Customer
                                                </p>

                                                <div className="mt-4 flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                                                        <User
                                                            size={16}
                                                            className="text-neutral-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {
                                                                selectedMessage.name
                                                            }
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-neutral-400">
                                                            {
                                                                selectedMessage.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* reply modal */}
                                    {replyOpen && (
                                        <div className="border-t border-neutral-200 px-5 py-5 sm:px-7">
                                            <div className="max-w-3xl">
                                                <div className="mb-3">
                                                    <p className="text-xs font-semibold">
                                                        Reply to {selectedMessage.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-neutral-400">
                                                        {selectedMessage.email}
                                                    </p>
                                                </div>

                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    placeholder="Write your reply..."
                                                    rows={6}
                                                    className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm outline-none transition focus:border-black focus:bg-white"
                                                />

                                                <div className="mt-3 flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setReplyOpen(false);
                                                            setReplyText("");
                                                        }}
                                                        className="rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-medium text-neutral-600 hover:border-black hover:text-black"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        onClick={handleSendReply}
                                                        disabled={!replyText.trim() || sendingReply}
                                                        className="rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        {sendingReply ? "Sending..." : "Send reply"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}


                                    {/* Actions */}
                                    <div className="border-t border-neutral-200 px-5 py-4 sm:px-7">
                                        <div className="flex flex-wrap items-center gap-2">

                                            <button
                                                onClick={() => setReplyOpen(true)}
                                                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
                                            >
                                                <Mail size={14} />
                                                Reply
                                            </button>

                                            <button
                                                onClick={handleMarkAsRead}
                                                disabled={selectedMessage.status === "read"}
                                                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-medium text-neutral-600 transition hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Check size={14} />
                                                {selectedMessage.status === "read"
                                                    ? "Already read"
                                                    : "Mark as read"}
                                            </button>

                                            <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-xs font-medium text-neutral-600 transition hover:border-black hover:text-black">
                                                <CheckCircle size={14} />
                                                Resolve
                                            </button>

                                            <button className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <Mail
                                            size={32}
                                            className="mx-auto text-neutral-300"
                                        />

                                        <p className="mt-4 text-sm font-medium">
                                            Select a message
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-400">
                                            Choose a conversation from your inbox.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
