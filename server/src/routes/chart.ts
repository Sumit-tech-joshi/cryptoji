// server/src/routes/chart.ts

import { Router } from 'express';
import axios from 'axios';
import Cache from '../models/cache';

const router = Router();

// GET /api/chart/:coinId?days=1 | 30 | 365 | max
router.get('/:coinId', async (req: any, res: any) => {
  const { coinId } = req.params;
  const { days = '1' } = req.query;

  const key = `${coinId}-chart-${
    days === '1' ? 'one-day' : days === '30' ? 'monthly' : days === '365' ? 'yearly' : 'all-time'
  }`;

  try {
    // Check cache
    const cachedData = await Cache.findOne({ key });
    if (cachedData) {
      console.log(`Serving chart data from cache: ${key}`);
      return res.json(cachedData.data);
    }

    // Fetch from CoinGecko
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      
    );


    // Cache it
    await Cache.create({ key, data: response.data });

    console.log(`New chart data fetched and cached: ${key}`);
    return res.json(response.data);
  } catch (error) {
    console.error('Chart API error:', error);
    res.status(500).json({ error: 'Chart data fetch failed' });
  }
});

export default router;
