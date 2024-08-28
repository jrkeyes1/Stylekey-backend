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
    { name: 'Red Dress', category: 'Dress', imageUrl: 'https://images.pexels.com/photos/2562497/pexels-photo-2562497.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Blue Jeans', category: 'Pants', imageUrl: 'https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'White Shirt', category: 'Top', imageUrl: 'https://images.pexels.com/photos/2535859/pexels-photo-2535859.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Red Dress', category: 'Dress', imageUrl: 'https://images.pexels.com/photos/2562497/pexels-photo-2562497.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Blue Jeans', category: 'Pants', imageUrl: 'https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'White Shirt', category: 'Top', imageUrl: 'https://images.pexels.com/photos/2535859/pexels-photo-2535859.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  await Item.insertMany(items);
  console.log('Database seeded');
  mongoose.connection.close();
};
