import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedItems();
  })
  .catch(err => console.log('MongoDB connection error:', err));

const seedItems = async () => {
  await Item.deleteMany({}); // Clear existing items

  const items = [
    { name: 'Red Dress', category: 'Dress', imageUrl: 'https://example.com/red-dress.jpg' },
    { name: 'Blue Jeans', category: 'Pants', imageUrl: 'https://example.com/blue-jeans.jpg' },
    { name: 'White Shirt', category: 'Top', imageUrl: 'https://example.com/white-shirt.jpg' },
  ];

  await Item.insertMany(items);
  console.log('Database seeded');
  mongoose.connection.close();
};
