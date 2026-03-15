import { json } from '@sveltejs/kit';
import { SECRET_GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { RequestHandler } from './$types';

// Inisialisasi model Gemini (murni berjalan di server, kunci Anda aman)
const genAI = new GoogleGenerativeAI(SECRET_GEMINI_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { trades, stats } = await request.json();

        // Validate if journal is empty
        if (!trades || trades.length === 0) {
            return json({ roast: "No data. You haven't even been brave enough to take a single position yet." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: {maxOutputTokens:2500} }); 
        
        // Brutal System Prompt
        const prompt = `You are a quantitative institutional risk manager who is extremely ruthless, elite, and objective. 
        Read these overall portfolio metrics:
        - Total PnL: $${stats.totalPnL}
        - Average Risk per Trade: $${stats.avgRisk}
        - Win Rate: ${stats.winRate}%
        
        And this raw historical data: ${JSON.stringify(trades)}. 
        
        Your task:
        1. Analyze these portfolio metrics. If their Win Rate is poor (< 30%) but PnL is still positive, attack their ego and call it pure luck due to Risk/Reward ratio. 
        2. If their PnL is destroyed (negative) and Average Risk is too large, call them a gambler who is destroying their account.
        3. If there is even one trade with capital risk > 5%, attack that lack of discipline.
        4. Take note of the target_ratio (Risk:Reward) for each position. If there are any ratios that are completely unrealistic, such as 1:10 or greater, call them greedy dreamers and tell them that the market does not hand out free money.
        5. Provide a brutally honest evaluation in English. No sympathy. Maximum 3 sharp sentences.`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        return json({ roast: textResponse });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        return json({ error: "Failed to call AI risk manager." }, { status: 500 });
    }
};
