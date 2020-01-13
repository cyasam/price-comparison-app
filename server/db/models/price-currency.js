import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Currency
const priceCurrency = new Schema({
  name: String,
  short: String,
  sign: String
});

const PriceCurrency = mongoose.model('PriceCurrency', priceCurrency);

export default mongoose.models.PriceCurrency || PriceCurrency;
