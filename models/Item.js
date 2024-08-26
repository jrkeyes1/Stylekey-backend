import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
