import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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

// Currency
const priceCurrency = new Schema({
  name: String,
  short: String
});

const PriceCurrency = mongoose.model('PriceCurrency', priceCurrency);

// Product
const productSchema = new Schema({
  name: String,
  productCategoryId: ObjectId,
  productUnitId: ObjectId
});

const Product = mongoose.model('Product', productSchema);

// ProductUnit
const productUnit = new Schema({
  name: String
});

const ProductUnit = mongoose.model('ProductUnit', productUnit);

// ProductCategory
const productCategorySchema = new Schema({
  name: String
});

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);

// Shop
const shopSchema = new Schema({
  name: String
});

const Shop = mongoose.model('Shop', shopSchema);

// User
const validateEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const validateEmail = email => {
  return validateEmailRegex.test(email);
};

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [validateEmailRegex, 'Please fill a valid email address']
  },
  password: String,
  createDate: Date
});

const User = mongoose.model('User', userSchema);

// Crawler
const crawlerSchema = new Schema({
  shopId: ObjectId,
  productCategoryId: ObjectId,
  productId: ObjectId,
  priceCurrencyId: ObjectId,
  fetchUrl: String,
  createDate: Date
});

const Crawler = mongoose.model('Crawler', crawlerSchema);

export default {
  Price,
  PriceCurrency,
  Product,
  ProductUnit,
  ProductCategory,
  Shop,
  User,
  Crawler
};
