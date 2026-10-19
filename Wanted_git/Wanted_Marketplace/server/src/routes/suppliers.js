import { Router } from 'express';
import Supplier from '../models/Supplier.js';
const router = Router();
router.post('/', async (req, res, next) => {
  try {
    const { businessName, contactName, email, phone, categories, address, city, country } = req.body;
    if (!businessName) return res.status(400).json({ error: 'businessName is required' });
    const supplier = await Supplier.create({ businessName, contactName, email, phone, categories, address, city, country, verified: false });
    res.status(201).json({ supplier, note: 'Supplier profile awaits verification.' });
  } catch (e) { next(e); }
});
router.get('/', async (req, res, next) => {
  try {
    const filter = { verified: true };
    if (req.query.city) filter.city = req.query.city;
    const items = await Supplier.find(filter).limit(100).lean();
    res.json({ items });
  } catch (e) { next(e); }
});
export default router;
