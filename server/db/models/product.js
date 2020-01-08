import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Product
const productSchema = new Schema({
  name: String,
  productCategoryId: ObjectId,
  productUnitId: ObjectId
});

const Product = mongoose.model('Product', productSchema);

export default mongoose.models.Product || Product;
