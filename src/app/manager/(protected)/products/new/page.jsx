"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
    ArrowLeft,
    Check,
    ChevronDown,
    ImagePlus,
    Loader,
    Plus,
    Sparkles,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import {
    cloudinaryCloudName,
    cloudinaryUploadOptions,
    cloudinaryUploadPreset,
} from "@/lib/cloudinary-config";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";

const sizes = [
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
];

const colors = [
    "Black",
    "White",
    "Grey",
    "Red",
    "Blue",
    "Green",
    "Brown",
    "Beige",
];

export default function NewProductPage() {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [images, setImages] = useState([]);
    const {showToast} = useCart()

    const [form, setForm] = useState({
        name: "",
        brand: "",
        sku: "",
        categoryId: "",
        description: "",
        price: "",
        oldPrice: "",
    });

    const [variants, setVariants] = useState([
        {
            id: Date.now(),
            size: "",
            color: "",
            stock: "",
        },
    ]);

    const [status, setStatus] = useState("draft");
    const [publishing, setPublishing] = useState(false);

    // AI analysis state
    const [analysing, setAnalysing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisError, setAnalysisError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []);

    // ── Scroll lock management ──────────────────────────────────────────
    // The Cloudinary upload widget (loaded from upload-widget.cloudinary.com)
    // sets overflow:hidden on body/html and doesn't always clean it up.
    // A MutationObserver reliably detects when the widget iframe is removed.
    const restoreScroll = useCallback(() => {
        document.body.style.overflow = "";
        document.body.style.overflowY = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.overflowY = "";
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            // Check if the Cloudinary widget iframe is still in the DOM
            const widgetIframe = document.querySelector(
                'iframe[src*="widget.cloudinary.com"], iframe[data-test="uw-iframe"]'
            );

            if (!widgetIframe) {
                restoreScroll();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style"],
        });

        return () => {
            observer.disconnect();
            restoreScroll();
        };
    }, [restoreScroll]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCloudinaryUpload = (result) => {
        const info = result?.info;

        if (!info?.secure_url) {
            return;
        }

        const newImage = {
            id: info.public_id,
            imageUrl: info.secure_url,
            preview: info.secure_url,
            altText: form.name || "Product image",
            primary: images.length === 0,
        };

        setImages((prev) => [...prev, newImage]);
    };
    const removeImage = (id) => {
        setImages((prev) => {
            const imageToRemove = prev.find((image) => image.id === id);
            const remaining = prev.filter((image) => image.id !== id);

            if (imageToRemove?.primary && remaining.length) {
                remaining[0].primary = true;
            }

            return remaining;
        });
    };

    const setPrimaryImage = (id) => {
        setImages((prev) =>
            prev.map((image) => ({
                ...image,
                primary: image.id === id,
            }))
        );
    };

    // ── AI image analysis ───────────────────────────────────────────────
    const analyseWithAI = async () => {
        const primaryImage = images.find((img) => img.primary) || images[0];

        if (!primaryImage) {
            setAnalysisError("Please upload an image first.");
            return;
        }

        try {
            setAnalysing(true);
            setAnalysisError("");
            setAnalysisResult(null);

            const response = await fetch("/api/products/analyse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl: primaryImage.imageUrl,
                }),
            });

            const data = await response.json();

            console.log("AI RESPONSE:", data);

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to analyze product image"
                );
            }

            // Your API returns { success, product }
            const product = data.product;

            if (!product) {
                throw new Error("AI returned no product information.");
            }

            setAnalysisResult(product);

            // Auto-fill product information
            setForm((prev) => ({
                ...prev,
                name: product.name || prev.name,
                brand: product.brand || prev.brand,
                description: product.description || prev.description,
            }));

            // Match AI category to your database category
            if (product.category && categories.length > 0) {
                const aiCategory = product.category.toLowerCase().trim();

                const match = categories.find((cat) => {
                    const categoryName = String(cat.name || "")
                        .toLowerCase()
                        .trim();

                    return (
                        categoryName.includes(aiCategory) ||
                        aiCategory.includes(categoryName)
                    );
                });

                if (match) {
                    setForm((prev) => ({
                        ...prev,
                        categoryId: String(match.id),
                    }));
                }
            }

            console.log("AI PRODUCT ANALYSIS:", product);
        } catch (error) {
            console.error("AI ANALYSIS ERROR:", error);

            setAnalysisError(
                error.message || "Something went wrong during analysis."
            );
        } finally {
            setAnalysing(false);
        }
    };

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                size: "",
                color: "",
                stock: "",
            },
        ]);
    };

    const updateVariant = (id, field, value) => {
        setVariants((prev) =>
            prev.map((variant) =>
                variant.id === id
                    ? {
                        ...variant,
                        [field]: value,
                    }
                    : variant
            )
        );
    };

    const removeVariant = (id) => {
        setVariants((prev) => prev.filter((variant) => variant.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Please enter a product name.");
            return;
        }


        if (!form.categoryId) {
            alert("Please select a category.");
            return;
        }

        if (!form.price) {
            alert("Please enter a price.");
            return;
        }

        if (images.length === 0) {
            alert("Please upload at least one product image.");
            return;
        }

        const validVariants = variants.filter((variant) =>
            variant.size &&
            variant.color &&
            variant.stock !== ""
        );

        if (validVariants.length === 0) {
            alert("Please add at least one valid product variant.");
            return;
        }

        try {
            setPublishing(true);

            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    brand: form.brand.trim() || null,
                    sku: form.sku.trim() || null,
                    categoryId: Number(form.categoryId),
                    description: form.description,
                    price: form.price,
                    oldPrice: form.oldPrice || null,
                    isActive: status === "active",
                    images: images.map((image, index) => ({
                        imageUrl: image.imageUrl,
                        altText: image.altText,
                        isPrimary: image.primary,
                        displayOrder: index,
                    })),
                    variants: validVariants.map((variant) => ({
                        size: variant.size,
                        color: variant.color,
                        stock: Number(variant.stock),
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create product");
            }
            

            showToast("Product created successfully!");

            setTimeout(() => {
               window.location.href = "/manager/products"; 
            }, 800);
            
        } catch (error) {
            console.error("CREATE PRODUCT ERROR:", error);
            alert(
                error.message ||
                "Something went wrong while creating the product.",
            );
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
                <div className="flex items-center justify-between px-6 py-4 lg:px-10">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/manager/products"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition hover:bg-gray-100"
                        >
                            <ArrowLeft size={17} />
                        </Link>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                                Products
                            </p>

                            <h1 className="mt-0.5 text-lg font-semibold">
                                Add New Product
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setStatus("draft")}
                            className="hidden rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 sm:block"
                        >
                            Save Draft
                        </button>

                        <button
                            form="product-form"
                            type="submit"
                            disabled={publishing}
                            className="flex items-center gap-2 rounded-xl bg-[#111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {publishing ? (
                                "Publishing..."
                            ) : (
                                <>
                                    <Check size={16} />
                                    Publish Product
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <form
                id="product-form"
                onSubmit={handleSubmit}
                className="mx-auto max-w-7xl p-6 lg:p-10"
            >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    {/* Main column */}
                    <div className="space-y-6">
                        {/* Basic information */}
                        <section className="rounded-2xl border border-black/10 bg-white">
                            <div className="border-b border-black/10 px-6 py-5">
                                <h2 className="font-semibold">
                                    Product Information
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Basic information about your shoe.
                                </p>
                            </div>

                            <div className="space-y-5 p-6">
                                {/* Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Product Name
                                    </label>

                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Nike Air Max 270"
                                        className="w-full rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                                    />
                                </div>

                                {/* Brand + Category */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Brand
                                            <span className="ml-2 text-xs font-normal text-gray-400">
                                                Optional
                                            </span>
                                        </label>

                                        <input
                                            name="brand"
                                            value={form.brand}
                                            onChange={handleChange}
                                            placeholder="e.g. Nike"
                                            className="w-full rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Category
                                        </label>

                                        <div className="relative">
                                            <select
                                                name="categoryId"
                                                value={form.categoryId}
                                                onChange={handleChange}
                                                disabled={loadingCategories}
                                                className="w-full appearance-none rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <option value="">
                                                    {loadingCategories
                                                        ? "Loading categories..."
                                                        : "Select category"}
                                                </option>

                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>

                                            <ChevronDown
                                                size={17}
                                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SKU */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        SKU
                                        <span className="ml-2 text-xs font-normal text-gray-400">
                                            Optional
                                        </span>
                                    </label>

                                    <input
                                        name="sku"
                                        value={form.sku}
                                        onChange={handleChange}
                                        placeholder="e.g. NKE-AM270-BLK"
                                        className="w-full rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm uppercase outline-none transition focus:border-black focus:bg-white"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="block text-sm font-medium">
                                            Description
                                        </label>

                                        <span className="text-xs text-gray-400">
                                            {form.description.length}/500
                                        </span>
                                    </div>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 500) {
                                                handleChange(e);
                                            }
                                        }}
                                        rows={5}
                                        placeholder="Describe the shoe, materials, fit, features, and anything customers should know..."
                                        className="w-full resize-none rounded-xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Images */}
                        <section className="rounded-2xl border border-black/10 bg-white">
                            <div className="border-b border-black/10 px-6 py-5">
                                <h2 className="font-semibold">
                                    Product Images
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Upload high-quality images of your shoe.
                                </p>
                            </div>

                            <div className="p-6">


                                {images.length === 0 ? (
                                    <CldUploadWidget
                                        cloudName={cloudinaryCloudName}
                                        uploadPreset={cloudinaryUploadPreset}
                                        onSuccess={handleCloudinaryUpload}
                                        onOpen={() => {
                                            document.body.style.overflow = "hidden";
                                            document.documentElement.style.overflow = "hidden";
                                        }}
                                        onClose={() => {
                                            restoreScroll();
                                            // Fallback: sometimes onClose fires before the iframe is removed
                                            setTimeout(restoreScroll, 100);
                                            setTimeout(restoreScroll, 500);
                                        }}
                                        onError={() => restoreScroll()}
                                        options={cloudinaryUploadOptions}
                                    >
                                        {({ open }) => (
                                            <button
                                                type="button"
                                                onClick={() => open()}
                                                className="flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-gray-50 px-6 text-center transition hover:border-black/30 hover:bg-gray-100"
                                            >
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                                    <ImagePlus size={24} />
                                                </div>

                                                <p className="mt-4 text-sm font-semibold">
                                                    Upload product images
                                                </p>

                                                <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
                                                    Upload multiple images of your shoe.
                                                    JPG, PNG or WebP.
                                                </p>

                                                <span className="mt-5 flex items-center gap-2 rounded-xl bg-[#111] px-4 py-2.5 text-xs font-medium text-white">
                                                    <Upload size={15} />
                                                    Choose Images
                                                </span>
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                            {images.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="group relative aspect-square overflow-hidden rounded-2xl border border-black/10 bg-gray-100"
                                                >
                                                    <img
                                                        src={image.preview}
                                                        alt="Product preview"
                                                        className="h-full w-full object-cover"
                                                    />

                                                    {image.primary && (
                                                        <div className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                                                            Main image
                                                        </div>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeImage(
                                                                image.id
                                                            )
                                                        }
                                                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
                                                    >
                                                        <X size={15} />
                                                    </button>

                                                    {!image.primary && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setPrimaryImage(
                                                                    image.id
                                                                )
                                                            }
                                                            className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/95 py-2 text-[10px] font-semibold opacity-0 shadow-sm transition group-hover:opacity-100"
                                                        >
                                                            Set as main image
                                                        </button>
                                                    )}
                                                </div>
                                            ))}

                                            <CldUploadWidget
                                                cloudName={cloudinaryCloudName}
                                                uploadPreset={cloudinaryUploadPreset}
                                                onSuccess={handleCloudinaryUpload}
                                                onOpen={() => {
                                                    document.body.style.overflow = "hidden";
                                                    document.documentElement.style.overflow = "hidden";
                                                }}
                                                onClose={() => {
                                                    restoreScroll();
                                                    setTimeout(restoreScroll, 100);
                                                    setTimeout(restoreScroll, 500);
                                                }}
                                                onError={() => restoreScroll()}
                                                options={cloudinaryUploadOptions}
                                            >
                                                {({ open }) => (
                                                    <button
                                                        type="button"
                                                        onClick={() => open()}
                                                        className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-gray-50 text-gray-500 transition hover:border-black/30 hover:bg-gray-100"
                                                    >
                                                        <Plus size={22} />

                                                        <span className="mt-2 text-xs font-medium">
                                                            Add Images
                                                        </span>
                                                    </button>
                                                )}
                                            </CldUploadWidget>
                                        </div>

                                        <p className="mt-4 text-xs text-gray-400">
                                            The first image will be used as the
                                            main product image unless you
                                            select another one.
                                        </p>

                                        {/* ── AI Analysis ── */}
                                        <div className="mt-5 flex flex-col gap-3">
                                            <button
                                                type="button"
                                                disabled={analysing}
                                                onClick={analyseWithAI}
                                                className="flex items-center justify-center gap-2.5 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-5 py-3 text-sm font-semibold text-purple-700 transition hover:from-purple-100 hover:to-indigo-100 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {analysing ? (
                                                    <>
                                                        <Loader
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                        Analysing image…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={16} />
                                                        Analyse with AI
                                                    </>
                                                )}
                                            </button>

                                            {analysisError && (
                                                <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
                                                    <X
                                                        size={14}
                                                        className="mt-0.5 shrink-0"
                                                    />
                                                    {analysisError}
                                                </div>
                                            )}

                                            {analysisResult && !analysisError && (
                                                <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Sparkles
                                                            size={14}
                                                            className="text-emerald-600"
                                                        />

                                                        <p className="text-xs font-semibold text-emerald-700">
                                                            AI auto-filled product details
                                                        </p>
                                                    </div>

                                                    <ul className="mt-2 space-y-1 text-xs text-emerald-600">

                                                        {analysisResult.name && (
                                                            <li>
                                                                ✓ Product name: {analysisResult.name}
                                                            </li>
                                                        )}

                                                        {analysisResult.brand && (
                                                            <li>
                                                                ✓ Brand: {analysisResult.brand}
                                                            </li>
                                                        )}

                                                        {analysisResult.description && (
                                                            <li>
                                                                ✓ Description
                                                            </li>
                                                        )}

                                                        {analysisResult.category && (
                                                            <li>
                                                                ✓ Category: {analysisResult.category}
                                                            </li>
                                                        )}

                                                        {analysisResult.colors?.length > 0 && (
                                                            <li>
                                                                ✓ Colors: {analysisResult.colors.join(", ")}
                                                            </li>
                                                        )}

                                                        {analysisResult.material && (
                                                            <li>
                                                                ✓ Material: {analysisResult.material}
                                                            </li>
                                                        )}

                                                        {analysisResult.style && (
                                                            <li>
                                                                ✓ Style: {analysisResult.style}
                                                            </li>
                                                        )}

                                                        {analysisResult.gender && (
                                                            <li>
                                                                ✓ Gender: {analysisResult.gender}
                                                            </li>
                                                        )}

                                                        {analysisResult.suggestedSizes?.length > 0 && (
                                                            <li>
                                                                ✓ Suggested sizes:{" "}
                                                                {analysisResult.suggestedSizes.join(", ")}
                                                            </li>
                                                        )}

                                                    </ul>

                                                    <p className="mt-2 text-[10px] text-emerald-500">
                                                        You can edit any auto-filled field above.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Variants */}
                        <section className="rounded-2xl border border-black/10 bg-white">
                            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                                <div>
                                    <h2 className="font-semibold">
                                        Product Variants
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Manage sizes, colors, and stock.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-xs font-medium transition hover:bg-gray-50"
                                >
                                    <Plus size={15} />
                                    Add Variant
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="hidden grid-cols-[1fr_1fr_120px_40px] gap-3 border-b border-black/10 pb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400 sm:grid">
                                    <span>Size</span>
                                    <span>Color</span>
                                    <span>Stock</span>
                                    <span />
                                </div>

                                <div className="space-y-3 sm:mt-3">
                                    {variants.map((variant) => (
                                        <div
                                            key={variant.id}
                                            className="grid gap-3 rounded-xl border border-black/10 p-4 sm:grid-cols-[1fr_1fr_120px_40px] sm:border-0 sm:p-0"
                                        >
                                            <div>
                                                <label className="mb-1 block text-[10px] font-medium uppercase text-gray-400 sm:hidden">
                                                    Size
                                                </label>

                                                <div className="relative">
                                                    <select
                                                        value={variant.size}
                                                        onChange={(e) =>
                                                            updateVariant(
                                                                variant.id,
                                                                "size",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full appearance-none rounded-xl border border-black/10 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-black"
                                                    >
                                                        <option value="">
                                                            Select size
                                                        </option>

                                                        {sizes.map((size) => (
                                                            <option
                                                                key={size}
                                                                value={size}
                                                            >
                                                                {size}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <ChevronDown
                                                        size={15}
                                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-[10px] font-medium uppercase text-gray-400 sm:hidden">
                                                    Color
                                                </label>

                                                <div className="relative">
                                                    <select
                                                        value={variant.color}
                                                        onChange={(e) =>
                                                            updateVariant(
                                                                variant.id,
                                                                "color",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full appearance-none rounded-xl border border-black/10 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-black"
                                                    >
                                                        <option value="">
                                                            Select color
                                                        </option>

                                                        {colors.map(
                                                            (color) => (
                                                                <option
                                                                    key={color}
                                                                    value={
                                                                        color
                                                                    }
                                                                >
                                                                    {color}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <ChevronDown
                                                        size={15}
                                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-[10px] font-medium uppercase text-gray-400 sm:hidden">
                                                    Stock
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={variant.stock}
                                                    onChange={(e) =>
                                                        updateVariant(
                                                            variant.id,
                                                            "stock",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="0"
                                                    className="w-full rounded-xl border border-black/10 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-black"
                                                />
                                            </div>

                                            <div className="flex items-center justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariant(
                                                            variant.id
                                                        )
                                                    }
                                                    disabled={
                                                        variants.length === 1
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black"
                                >
                                    <Plus size={15} />
                                    Add another variant
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        {/* Status */}
                        <section className="rounded-2xl border border-black/10 bg-white p-6">
                            <h2 className="font-semibold">
                                Product Status
                            </h2>

                            <div className="mt-5 space-y-2">
                                <button
                                    type="button"
                                    onClick={() => setStatus("draft")}
                                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${status === "draft"
                                        ? "border-black bg-gray-50"
                                        : "border-black/10"
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            Draft
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Keep hidden from customers
                                        </p>
                                    </div>

                                    <div
                                        className={`h-4 w-4 rounded-full border ${status === "draft"
                                            ? "border-[5px] border-black"
                                            : "border-black/20"
                                            }`}
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStatus("active")}
                                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${status === "active"
                                        ? "border-black bg-gray-50"
                                        : "border-black/10"
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            Active
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Visible in your store
                                        </p>
                                    </div>

                                    <div
                                        className={`h-4 w-4 rounded-full border ${status === "active"
                                            ? "border-[5px] border-black"
                                            : "border-black/20"
                                            }`}
                                    />
                                </button>
                            </div>
                        </section>

                        {/* Pricing */}
                        <section className="rounded-2xl border border-black/10 bg-white p-6">
                            <h2 className="font-semibold">
                                Pricing
                            </h2>

                            <div className="mt-5 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Price
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                                            KSh
                                        </span>

                                        <input
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            type="number"
                                            min="0"
                                            placeholder="12,500"
                                            className="w-full rounded-xl border border-black/10 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-black focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Compare-at Price
                                        <span className="ml-2 text-xs font-normal text-gray-400">
                                            Optional
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                                            KSh
                                        </span>

                                        <input
                                            name="oldPrice"
                                            value={form.oldPrice}
                                            onChange={handleChange}
                                            type="number"
                                            min="0"
                                            placeholder="10,999"
                                            className="w-full rounded-xl border border-black/10 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-black focus:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Publish card */}
                        <section className="rounded-2xl bg-[#111] p-6 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                <Upload size={18} />
                            </div>

                            <h2 className="mt-5 font-semibold">
                                Ready to publish?
                            </h2>

                            <p className="mt-2 text-xs leading-5 text-white/50">
                                Make sure your product information, images,
                                pricing, and variants are correct before
                                publishing.
                            </p>

                            <button
                                type="submit"
                                disabled={publishing}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-100 disabled:opacity-60"
                            >
                                <Check size={16} />
                                {publishing
                                    ? "Publishing..."
                                    : "Publish Product"}
                            </button>
                        </section>

                        {/* Image info */}
                        <div className="rounded-2xl border border-dashed border-black/15 p-5">
                            <p className="text-xs font-semibold">
                                Image guidelines
                            </p>

                            <ul className="mt-3 space-y-2 text-xs leading-5 text-gray-500">
                                <li>• Use clear, high-quality images</li>
                                <li>• Show multiple angles</li>
                                <li>• Use a clean background</li>
                                <li>• Recommended: 1000 × 1000px</li>
                                <li>• JPG, PNG or WebP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
