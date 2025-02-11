import { Router } from 'express';
import axios from 'axios';

const router = Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';

router.get('/', async (req: any, res: any) => {
  // const { q } = req?.query?.param || 'cryptocurrency'; // query param, e.g., coin ID or name
  try {
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_668626c590ad16cc0e9756aa212b164fd9761&q=cryptocurrency&country=ca`, {

    });
    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;
