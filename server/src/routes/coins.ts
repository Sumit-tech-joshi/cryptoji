
import { Router } from 'express';
import axios from 'axios';
import Cache from '../models/cache';

const router = Router();

// GET /api/coins -> Fetches top cryptocurrency market data
router.get('/', async (req: any , res: any) => {
  const cacheKey = 'coins_data'; // Unique key for this API

  try {
    // Check Cache First
    const cachedData = await Cache.findOne({ key: cacheKey });

    if (cachedData) {
      console.log('Serving from Cache:', cacheKey);
      return res.json(cachedData.data);
    }

    //Fetch Fresh Data if Not in Cache
    console.log('Fetching new data from API...');
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      }
    });

    //Store Data in Cache
    await Cache.create({ key: cacheKey, data: response.data });

    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return res.status(500).json({ error: 'Failed to fetch coins' });
  }
});

// GET /api/coins/:id -> Fetches details of a specific coin
router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const cacheKey = `coin_${id}`;

  try {
    //Check Cache First
    const cachedData = await Cache.findOne({ key: cacheKey });
    if (cachedData) {
      console.log('Serving from Cache:', cacheKey);
      return res.json(cachedData.data);
    }

    //Fetch Fresh Data
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

    // Store in Cache
    await Cache.create({ key: cacheKey, data: response.data });

    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return res.status(500).json({ error: `Failed to fetch coin data ::  ${error}` });
  }
});

export default router;
