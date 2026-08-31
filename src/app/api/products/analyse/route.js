import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

function extractJSON(text) {
    const fenceMatch = text.match(
        /```(?:json)?\s*([\s\S]*?)\s*```/
    );

    if (fenceMatch) {
        return fenceMatch[1].trim();
    }

    return text.trim();
}

export async function POST(request) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image URL is required",
                },
                { status: 400 }
            );
        }

        // Download the Cloudinary image
        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            throw new Error(
                `Failed to download image: ${imageResponse.status}`
            );
        }

        const contentType =
            imageResponse.headers.get("content-type") || "image/jpeg";

        const imageBuffer = await imageResponse.arrayBuffer();

        const base64Image = Buffer.from(imageBuffer).toString("base64");

        const prompt = `
Analyze this product image for an online shoe/clothing store.

Return ONLY valid JSON.

Use exactly this structure:

{
    "name": "",
    "brand": "",
    "category": "",
    "description": "",
    "colors": [],
    "material": "",
    "style": "",
    "gender": "",
    "suggestedSizes": []
}

Rules:

- name: Create a useful product name based on what you see.
- brand: Identify the brand only if it is visible or reasonably identifiable.
  Otherwise return "".
- category: Choose an appropriate category such as:
  Running Shoes, Casual Shoes, Boots, Slides & Sandals, Sneakers.
- description: Write a professional e-commerce product description.
- colors: Return an array of visible colors.
- material: Estimate the likely material only when visually reasonable.
- style: Describe the overall style.
- gender: Use Men, Women, Unisex, or "" if uncertain.
- suggestedSizes: Suggest reasonable shoe sizes if appropriate.
- Do not invent a specific model number.
- Do not claim that a product is authentic based only on the image.
- If something cannot be determined, return an empty string or empty array.
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: [
                {
                    inlineData: {
                        mimeType: contentType,
                        data: base64Image,
                    },
                },
                {
                    text: prompt,
                },
            ],
        });

        const text = response.text;

        if (!text) {
            throw new Error("Gemini returned an empty response");
        }

        const cleaned = extractJSON(text);

        let product;

        try {
            product = JSON.parse(cleaned);
        } catch (parseError) {
            console.error("GEMINI RAW RESPONSE:", text);
            throw new Error("Gemini returned invalid JSON");
        }

        return NextResponse.json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("PRODUCT ANALYSIS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error?.message ||
                    "Failed to analyze product image",
            },
            { status: 500 }
        );
    }
}