import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Shop
const shopSchema = new Schema({
  name: String,
  crawlerCallback: String
});

const Shop = mongoose.model('Shop', shopSchema);

export default mongoose.models.Shop || Shop;
