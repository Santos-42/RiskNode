import { json } from '@sveltejs/kit';
import { SECRET_GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

// Inisialisasi model Gemini (murni berjalan di server, kunci Anda aman)
const genAI = new GoogleGenerativeAI(SECRET_GEMINI_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { trades } = await request.json();

        // Validate if journal is empty
        if (!trades || trades.length === 0) {
            return json({ roast: "No data. You haven't even been brave enough to take a single position yet." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // Brutal System Prompt
        const prompt = `You are a quantitative institutional risk manager who is extremely ruthless, elite, and objective. 
        Read this historical trading data: ${JSON.stringify(trades)}. 
        Your task:
        1. Analyze if they violated basic risk management rules (risk > 5%).
        2. If their Win Rate is poor but they are still in profit, call it luck. 
        3. Provide a brutally honest evaluation in English. No sympathy. Maximum 3 sharp sentences.`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        return json({ roast: textResponse });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        return json({ error: "Failed to call AI risk manager." }, { status: 500 });
    }
};
