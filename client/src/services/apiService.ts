import axios from "axios";

// Cache Helper Function
const fetchWithCache = async (
  key: string,
  apiUrl: string,
  cacheTime: number = 6000
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

// Fetch Coins
export const getCoins = async () => {
  return await fetchWithCache("crypto-coins", "http://localhost:3001/api/coins");
};

// Fetch News
export const getNews = async () => {
  return await fetchWithCache("crypto-news", "http://localhost:3001/api/news");
};

// Fetch YouTube Videos
export const getVideos = async () => {
  return await fetchWithCache(
    "crypto-videos",
    "http://localhost:3001/api/youtube?q=cryptocurrency"
  );
};
