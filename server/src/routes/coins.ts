import { Router } from 'express';
import axios from 'axios';
import express from 'express';

const router = Router(); 

// GET /api/coins -> list of top coins
router.get('/', async (req: any , res: any) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch coins list' });
  }
});

// GET /api/coins/:id -> details of one coin
router.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch coin data' });
  }
});

export default router;
