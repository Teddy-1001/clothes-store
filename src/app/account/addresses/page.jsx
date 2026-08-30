"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Check,
    Home,
    MapPin,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import Header from "@/components/Header";

export default function AddressesPage() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            label: "Home",
            name: "Ted Williams",
            phone: "+254 798 125 596",
            address: "Kapsoya",
            city: "Eldoret",
            county: "Uasin Gishu",
            postalCode: "30100",
            isDefault: true,
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const emptyForm = {
        label: "Home",
        name: "",
        phone: "",
        address: "",
        city: "",
        county: "",
        postalCode: "",
    };

    const [form, setForm] = useState(emptyForm);

    const openAddForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (address) => {
        setForm({
            label: address.label,
            name: address.name,
            phone: address.phone,
            address: address.address,
            city: address.city,
            county: address.county,
            postalCode: address.postalCode,
        });

        setEditingId(address.id);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            setAddresses((current) =>
                current.map((address) =>
                    address.id === editingId
                        ? {
                              ...address,
                              ...form,
                          }
                        : address
                )
            );
        } else {
            const newAddress = {
                id: Date.now(),
                ...form,
                isDefault: addresses.length === 0,
            };

            setAddresses((current) => [
                ...current,
                newAddress,
            ]);
        }

        closeForm();
    };

    const deleteAddress = (id) => {
        setAddresses((current) => {
            const remaining = current.filter(
                (address) => address.id !== id
            );

            // Make the first remaining address default
            if (
                remaining.length > 0 &&
                !remaining.some(
                    (address) => address.isDefault
                )
            ) {
                remaining[0] = {
                    ...remaining[0],
                    isDefault: true,
                };
            }

            return remaining;
        });
    };

    const makeDefault = (id) => {
        setAddresses((current) =>
            current.map((address) => ({
                ...address,
                isDefault: address.id === id,
            }))
        );
    };

    return (
        <main className="min-h-screen bg-[#fafaf9] text-gray-900">
            <Header />

            {/* =====================================================
                HEADER
            ====================================================== */}

            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

                    <Link
                        href="/account"
                        className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-gray-900"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to Account
                    </Link>

                    <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                                Account
                            </p>

                            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                                Addresses
                            </h1>

                            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500">
                                Manage your saved delivery addresses
                                for faster checkout.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openAddForm}
                            className="group flex w-fit items-center gap-3 rounded-full bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black hover:shadow-lg"
                        >
                            <Plus size={15} />

                            Add Address
                        </button>

                    </div>

                </div>
            </section>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">

                {addresses.length === 0 ? (
                    <EmptyState onAdd={openAddForm} />
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">

                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                onEdit={() =>
                                    openEditForm(address)
                                }
                                onDelete={() =>
                                    deleteAddress(address.id)
                                }
                                onDefault={() =>
                                    makeDefault(address.id)
                                }
                            />
                        ))}

                    </div>
                )}

            </section>

            {/* =====================================================
                MODAL
            ====================================================== */}

            {showForm && (
                <AddressModal
                    form={form}
                    editing={Boolean(editingId)}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onClose={closeForm}
                />
            )}
        </main>
    );
}


/* =========================================================
   ADDRESS CARD
========================================================= */

function AddressCard({
    address,
    onEdit,
    onDelete,
    onDefault,
}) {
    return (
        <article
            className={`group relative rounded-[28px] border bg-white p-7 transition-all duration-300 sm:p-8 ${
                address.isDefault
                    ? "border-gray-900 shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
                    : "border-gray-200 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
            }`}
        >

            {/* Default badge */}

            {address.isDefault && (
                <div className="absolute right-7 top-7 flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                    <Check size={11} />
                    Default
                </div>
            )}

            {/* Header */}

            <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                    <Home
                        size={17}
                        strokeWidth={1.5}
                    />
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                        Delivery address
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                        {address.label}
                    </h2>
                </div>

            </div>

            {/* Address */}

            <div className="mt-7 border-t border-gray-100 pt-7">

                <p className="text-sm font-semibold">
                    {address.name}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    {address.address}
                    <br />
                    {address.city}, {address.county}
                    <br />
                    {address.postalCode}
                </p>

                <p className="mt-4 text-xs text-gray-400">
                    {address.phone}
                </p>

            </div>

            {/* Actions */}

            <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">

                <div className="flex items-center gap-4">

                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:text-gray-900"
                    >
                        <Pencil size={13} />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-red-500"
                    >
                        <Trash2 size={13} />
                        Delete
                    </button>

                </div>

                {!address.isDefault && (
                    <button
                        type="button"
                        onClick={onDefault}
                        className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-gray-900"
                    >
                        Make Default
                    </button>
                )}

            </div>

        </article>
    );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ onAdd }) {
    return (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-gray-200 bg-white px-6 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                <MapPin size={28} strokeWidth={1.2} />
            </div>

            <h2 className="mt-7 text-2xl font-semibold tracking-tight">
                No saved addresses
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                Add a delivery address to make your next
                checkout quicker and easier.
            </p>

            <button
                type="button"
                onClick={onAdd}
                className="mt-8 flex items-center gap-2 rounded-full bg-gray-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-black"
            >
                <Plus size={15} />
                Add Your First Address
            </button>

        </div>
    );
}


/* =========================================================
   ADDRESS MODAL
========================================================= */

function AddressModal({
    form,
    editing,
    onChange,
    onSubmit,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">

            <div className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[32px] bg-white p-7 shadow-2xl sm:max-w-2xl sm:rounded-[32px] sm:p-9">

                {/* Close */}

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
                >
                    <X size={16} />
                </button>

                {/* Header */}

                <div className="pr-12">

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Delivery
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                        {editing
                            ? "Edit Address"
                            : "Add New Address"}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                        Enter the details where you'd like your
                        order delivered.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={onSubmit}
                    className="mt-8"
                >

                    {/* Label */}

                    <div>
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Address Label
                        </label>

                        <select
                            name="label"
                            value={form.label}
                            onChange={onChange}
                            className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fafaf9] px-4 text-sm outline-none transition focus:border-gray-900 focus:bg-white"
                        >
                            <option value="Home">
                                Home
                            </option>

                            <option value="Work">
                                Work
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    {/* Name + Phone */}

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">

                        <Input
                            label="Full Name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="Ted Williams"
                            required
                        />

                        <Input
                            label="Phone Number"
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            placeholder="+254 7XX XXX XXX"
                            required
                        />

                    </div>

                    {/* Address */}

                    <div className="mt-5">

                        <Input
                            label="Street / Area"
                            name="address"
                            value={form.address}
                            onChange={onChange}
                            placeholder="Kapsoya"
                            required
                        />

                    </div>

                    {/* City + County */}

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">

                        <Input
                            label="City / Town"
                            name="city"
                            value={form.city}
                            onChange={onChange}
                            placeholder="Eldoret"
                            required
                        />

                        <Input
                            label="County"
                            name="county"
                            value={form.county}
                            onChange={onChange}
                            placeholder="Uasin Gishu"
                            required
                        />

                    </div>

                    {/* Postal */}

                    <div className="mt-5 sm:w-1/2">

                        <Input
                            label="Postal Code"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={onChange}
                            placeholder="30100"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-gray-200 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-full bg-gray-900 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-black"
                        >
                            {editing
                                ? "Save Changes"
                                : "Save Address"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fafaf9] px-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5"
            />
        </div>
    );
}