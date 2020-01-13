import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Crawler
const crawlerSchema = new Schema({
  shopId: ObjectId,
  productCategoryId: ObjectId,
  productId: ObjectId,
  priceCurrencyId: ObjectId,
  fetchUrl: String,
  createDate: Date,
  successProcessDate: Date
});

const Crawler = mongoose.model('Crawler', crawlerSchema);

export default mongoose.models.Crawler || Crawler;
