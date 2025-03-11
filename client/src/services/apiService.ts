import axios from "axios";

// Cache Helper Function
const fetchWithCache = async (
  key: string,
  apiUrl: string,
  cacheTime: number = 6
) => {
  const now = new Date().getTime();
  const cachedData = localStorage.getItem(key);
  console.log({ key, apiUrl})

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
export const getCoins = async (q = '') => {
  let query = q || "crypto-coins";
  return await fetchWithCache(query || "crypto-coins", `http://localhost:3001/api/coins?q=${encodeURIComponent(query)}`);
};

// Fetch News
export const getNews = async (q = '') => {
  let query = q || "crypto-news";
  return await fetchWithCache(query || "crypto-news", `http://localhost:3001/api/news?q=${encodeURIComponent(query)}`);
};

// Fetch YouTube Videos
export const getVideos = async (query = '') => {
  return await fetchWithCache(
    "crypto-videos",
    `http://localhost:3001/api/youtube?q=${query}`,
    
  );
};
