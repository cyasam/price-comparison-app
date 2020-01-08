import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// ProductUnit
const productUnit = new Schema({
  name: String
});

const ProductUnit = mongoose.model('ProductUnit', productUnit);

export default mongoose.models.ProductUnit || ProductUnit;
