import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import coinRoutes from './routes/coins';
import newsRoutes from './routes/news';
import youtubeRoutes from './routes/youtube';



dotenv.config();

const app = express();
const PORT = 3001;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cryptoDB';

// Middleware
app.use(cors());
app.use(express.json());

// Database
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/coins', coinRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/youtube', youtubeRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
