import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export default ai