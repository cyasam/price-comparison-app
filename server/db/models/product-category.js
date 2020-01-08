import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// ProductCategory
const productCategorySchema = new Schema({
  name: String
});

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);

export default mongoose.models.ProductCategory || ProductCategory;
