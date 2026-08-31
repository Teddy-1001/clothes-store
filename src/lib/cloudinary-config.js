export const cloudinaryCloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cloudinaryUploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
    "clothing_store_products";

export const cloudinaryUploadOptions = {
    multiple: true,
    maxFiles: 8,
    resourceType: "image",
    sources: ["local"],
    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
    maxFileSize: 5000000,
};
