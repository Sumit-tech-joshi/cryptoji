import { Router } from 'express';
import axios from 'axios';
import Cache from '../models/cache';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

router.get('/', async (req: any, res: any) => {
  const cacheKey = req.query.q || 'crypto_news'; // Unique key for news data
  const queryData = req.query.q || 'cryptocurrency';

  try {
    // Check Cache First
    const cachedData = await Cache.findOne({ key: `news-cache-${cacheKey}` });

    if (cachedData) {
      console.log('Serving News from Cache');
      return res.json(cachedData.data);
    }

    const url = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=${queryData}&country=ca`;

    console.log({ url })
    // Fetch Fresh Data
    const response = await axios.get(url);

    // Store in Cache
    await Cache.create({ key: `news-cache-${cacheKey}`, data: response.data });

    return res.json(response.data);
  } catch (error) {
    console.error(' Error fetching news:', error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
