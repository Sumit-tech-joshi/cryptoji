import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import getCryptoAnalysisPrompt from "../components/cryptoAnalysisPrompt";

const GEMINI_API_KEY = 'AIzaSyD_5J2BZ-yhpUzbHsV8If6obDPUKbFeo1w';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


// Cache Helper Function
const fetchWithCache = async (
  key: string,
  apiUrl: string,
  cacheTime: number = 6
) => {
  const now = new Date().getTime();
  const cachedData = localStorage.getItem(key);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    // Check if cache is still valid
    if (now - timestamp < cacheTime * 1000) {
      console.log(`Using cached data for: ${key}`);
      return data;
    }
  }

  try {
    console.log(`Fetching fresh data for: ${key}`);
    const response = await axios.get(apiUrl);
    localStorage.setItem(
      key,
      JSON.stringify({ data: response.data, timestamp: now })
    );
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};


// Function to clean Markdown-wrapped JSON before parsing
const cleanMarkdownJSON = (text) => {
  return text.replace(/```json\n?([\s\S]*?)\n?```/g, "$1").trim();
};


// Function to get AI insights for a cryptocurrency
export const getAIInsights = async (coinName) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = getCryptoAnalysisPrompt(coinName); // Get structured prompt

    const result = await chatSession.sendMessage(prompt);
    let aiResponseText = result.response.text(); // Extract raw AI response text

    // Clean Markdown-style code block if present
    aiResponseText = cleanMarkdownJSON(aiResponseText);

    try {
      // Ensure response is properly formatted JSON
      const structuredResponse = JSON.parse(aiResponseText);
      return structuredResponse;
    } catch (jsonError) {
      console.error("Error parsing AI response JSON:", jsonError);
      return { error: "Failed to parse AI response. Please try again." };
    }


  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Failed to fetch insights. Please try again.";
  }
};


// Fetch Coins
export const getCoins = async (q = "") => {
  let query = q || "crypto-coins";
  return await fetchWithCache(
    query || "crypto-coins",
    `http://localhost:3001/api/coins?q=${encodeURIComponent(query)}`
  );
};

export const getCoin = async (coinID) => {
  return await fetchWithCache(
    `crypto-coin-data-${coinID}`,
    `http://localhost:3001/api/coins/${coinID}`
  );
};

export const getCoinChart = async (coinId: string, days: string) => {
  const response = await fetch(`http://localhost:3001/api/chart/${coinId}?days=${days}`);
  return await response.json();
};

// Fetch News
export const getNews = async (q = "") => {
  let query = q || "crypto-news";
  return await fetchWithCache(
    query || "crypto-news",
    `http://localhost:3001/api/news?q=${encodeURIComponent(query)}`
  );
};


// Fetch YouTube Videos
export const getVideos = async (query = "") => {
  return await fetchWithCache(
    "crypto-videos",
    `http://localhost:3001/api/youtube?q=${query}`
  );
};
