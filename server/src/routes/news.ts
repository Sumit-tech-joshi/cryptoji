import { Router } from 'express';
import axios from 'axios';

const router = Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

router.get('/', async (req: any, res: any) => {
  const { q } = req.query; // query param, e.g., coin ID or name
  try {
    const response = await axios.get('https://cryptopanic.com/api/free/v1/posts/?auth_token=73259e4a53342e54d90af10dbbfa2ce1764d8a53', {

    });
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
