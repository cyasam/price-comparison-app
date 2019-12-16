import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Price
const priceSchema = new Schema({
  shopId: ObjectId,
  productCategoryId: ObjectId,
  productId: ObjectId,
  price: Number,
  createDate: Date
});

const Price = mongoose.model('Price', priceSchema);

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

export default {
  Price,
  Product,
  ProductUnit,
  ProductCategory,
  Shop
};
