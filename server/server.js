import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();
const port = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected')).catch(() => console.warn('MongoDB unavailable — continuing without saved analyses.'));
}
app.listen(port, () => console.log(`Smart Land API listening on ${port}`));
