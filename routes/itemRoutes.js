import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
