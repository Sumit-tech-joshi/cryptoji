import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import coinRoutes from './routes/coins';
import newsRoutes from './routes/news';
import youtubeRoutes from './routes/youtube';
import chartRoutes from './routes/chart';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cryptoDB';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { dbName: 'cryptoDB' })
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error(' MongoDB Connection Error:', err));

// Routes
app.use('/api/coins', coinRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/chart', chartRoutes);

app.get('/', (req, res) => {
  res.send('CryptoJi Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
