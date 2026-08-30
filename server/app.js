import express from 'express';
import cors from 'cors';
import landRoutes from './routes/landRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/land', landRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/schemes', schemeRoutes);
app.use((err, _, res, __) => res.status(err.status || 500).json({ message: err.message || 'Something went wrong.' }));
export default app;
