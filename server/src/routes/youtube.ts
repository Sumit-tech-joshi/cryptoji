import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Cache from '../models/cache';

dotenv.config();

const router = Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_BACKUP_API;

router.get('/', async (req: any, res: any) => {
  const query = req.query.q || 'cryptocurrency';
  const cacheKey = req.query.q || query; // Unique cache key per query

  try {
    // Check Cache First
    const cachedData = await Cache.findOne({ key: `youtube-cache-${cacheKey}` });

    if (cachedData) {
      console.log('Serving YouTube videos from Cache');
      return res.json(cachedData.data);
    }

    // Fetch Fresh Data
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: { part: 'snippet', q: query, key: YOUTUBE_API_KEY, type: 'video', maxResults: 12 }
    });

    // Store in Cache
    await Cache.create({ key: `youtube-cache-${cacheKey}`, data: response.data.items });

    return res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

export default router;
