import mongoose from 'mongoose';

const cacheSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // Unique key (API Endpoint)
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Cached Data
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Auto-delete after 1 hour
});

const Cache = mongoose.model('Cache', cacheSchema);

export default Cache;