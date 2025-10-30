import { GoogleGenAI } from "@google/genai";

// Per coding guidelines, initialize GoogleGenAI with process.env.API_KEY directly,
// assuming the environment variable is pre-configured and available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArtQuote = async (reason: string): Promise<string> => {
  try {
    const prompt = `Berdasarkan alasan seseorang ingin bergabung dengan klub seni ini: "${reason}", buatkan sebuah kutipan motivasi yang singkat, kuat, dan inspiratif tentang seni. Kutipan harus dalam Bahasa Indonesia dan tidak lebih dari 20 kata.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating quote from Gemini:", error);
    throw new Error("Failed to generate motivational quote.");
  }
};
