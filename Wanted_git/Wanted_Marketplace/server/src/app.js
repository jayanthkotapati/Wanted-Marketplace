import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import shopRoutes from './routes/shops.js';
import supplierRoutes from './routes/suppliers.js';
import deliveryRoutes from './routes/delivery.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'wanted-api', environment: process.env.NODE_ENV || 'development' }));
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Internal server error' });
});
export default app;
