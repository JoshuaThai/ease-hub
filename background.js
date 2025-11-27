import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAtzHuQq0sNFysPDj5uHrtO0xcEM3lI6sI" });

async function provideInspoQuote() {
        const model = ai.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Provide a random inspriational quote.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        document.getElementById('generateQuote').innerText = text;
    }
// Runs when the "Generate Inspirational Quote" button is clicked
document.getElementById('generateQuote').addEventListener('click', provideInspoQuote);

// Save default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting']
    });
  }
});