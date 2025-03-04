# CryptoJi - Cryptocurrency Tracking and Insights Platform

## 🚀 Project Overview
CryptoJi is a web application designed for cryptocurrency enthusiasts to **track, analyze, and manage** their favorite digital assets. The platform provides **real-time price updates**, latest crypto news, AI-powered insights, and the ability to **mark favorite coins** for easy tracking.

## ✨ Features

### **1️⃣ Real-Time Cryptocurrency Tracking**
- Live price updates with real-time market data.
- Dynamic price fluctuations every 4 seconds.
- Coin details including price, market cap, and 24h change.

### **2️⃣ Favorite Coins Management**
- Users can **search and select favorite coins** on sign-up.
- Favorites are stored in **Clerk's publicMetadata**.
- Users can add/remove favorite coins from the **home page table**.
- A separate **Favorites page** to view selected coins.

### **3️⃣ Cryptocurrency News & Videos**
- Aggregated news from top sources.
- Embedded YouTube videos for crypto insights.
- Carousels for a smooth browsing experience.

### **4️⃣ User Authentication**
- Secure sign-up/login using **Clerk**.
- Personalized experience based on user preferences.

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, React Router
- **Backend:** Node.js, Express (API for coins, news, videos)
- **Authentication:** Clerk
- **Styling:** CSS with a **custom design system**
- **API Integrations:** CoinGecko (Crypto Data), NewsAPI (Crypto News), YouTube Data API

## 🏁 Getting Started

### **🔹 1. Clone the Repository**
```bash
git clone https://github.com/nic-dgl-409-2025wi/project-Sumit-tech-joshi
cd cryptoji
```

### **🔹 2. Install Dependencies**
#### Client:
```bash
cd client
npm install
```
#### Server:
```bash
cd server
npm install
```

### **🔹 3. Set Up Environment Variables**
Create a `.env` file in both `client/` and `server/` directories with the following:

#### Client (`client/.env`):
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
REACT_APP_API_BASE_URL=http://localhost:3001
```

#### Server (`server/.env`):
```env
PORT=3001
COINGECKO_API_KEY=your_coingecko_api_key
NEWS_API_KEY=your_newsapi_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### **🔹 4. Start the Development Servers**
#### Start Backend:
```bash
cd server
npm run dev
```
#### Start Frontend:
```bash
cd client
npm start
```

### **🔹 5. Open in Browser**
Go to `http://localhost:3000` to access CryptoJi.

## 🛠 API Routes
### **Backend API Endpoints:**
| Endpoint                  | Method | Description |
|---------------------------|--------|-------------|
| `/api/coins`              | GET    | Fetches top cryptocurrencies |
| `/api/news`               | GET    | Fetches latest crypto news |
| `/api/youtube?q=query`    | GET    | Fetches YouTube videos |

## 📌 Roadmap
- ✅ **Implement user authentication with Clerk**
- ✅ **Integrate CoinGecko API for live pricing**
- ✅ **Add favorites feature with Clerk `publicMetadata`**
- ⏳ **Improve UI/UX with Tailwind and animations**
- ⏳ **Add portfolio tracking feature**

## 🌟 Acknowledgments
- [CoinGecko](https://www.coingecko.com/) for crypto data.
- [NewsAPI](https://newsapi.org/) for crypto news.
- [YouTube Data API](https://developers.google.com/youtube/) for videos.
- [Clerk](https://clerk.dev/) for authentication.