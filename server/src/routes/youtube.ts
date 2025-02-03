import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/', async (req: any, res: any) => {
  try {
    const query = req.query.q || 'cryptocurrency';
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: query,
        key: YOUTUBE_API_KEY,
        type: 'video',
        maxResults: 5
      }
    });

    return res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

export default router;
