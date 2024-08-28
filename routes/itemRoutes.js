import express from 'express';
import axios from 'axios';
import Item from '../models/Item.js';

const router = express.Router();

// CRUD Routes for Your Items

// Create a new item
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Update an item by ID
router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete an item by ID
router.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// New Route: Fetch Random Outfit Images from Unsplash API
router.get('/random-outfit', async (req, res) => {
  try {
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

    const categories = ['tops', 'bottoms', 'shoes'];

    const fetchRandomImage = async (category) => {
      const response = await axios.get(`https://api.unsplash.com/photos/random`, {
        params: {
          query: category,
          client_id: unsplashAccessKey,
        },
      });
      return response.data.urls.small;
    };

    const randomOutfit = await Promise.all(
      categories.map(category => fetchRandomImage(category))
    );

    res.status(200).json({
      top: randomOutfit[0],
      bottom: randomOutfit[1],
      shoes: randomOutfit[2],
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch random outfit' });
  }
});

export default router;

