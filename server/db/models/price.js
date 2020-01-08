import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Price
const priceSchema = new Schema({
  shopId: ObjectId,
  productCategoryId: ObjectId,
  productId: ObjectId,
  price: Number,
  priceCurrencyId: ObjectId,
  createDate: Date
});

const Price = mongoose.model('Price', priceSchema);

export default mongoose.models.Price || Price;
