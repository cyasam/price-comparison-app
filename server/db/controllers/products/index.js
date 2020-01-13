import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const errorHandler = input => {
  if (!ObjectId.isValid(input.productCategoryId)) {
    throw new ValidationError(
      `productCategoryId: ${input.productCategoryId} not valid`
    );
  } else if (!ObjectId.isValid(input.productUnitId)) {
    throw new ValidationError(
      `productUnitId: ${input.productUnitId} not valid`
    );
  }
};

const getProducts = async (args, models) => {
  const Product = models.Product;

  const product = await Product.find(args);

  return product;
};

const getProduct = async (args, models) => {
  const Product = models.Product;

  const product = await Product.findById(args.productId);

  return product;
};

const addProduct = async (args, models) => {
  const Product = models.Product;
  const { name } = args.input;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    throw new ForbiddenError(`${name} product exists`);
  }

  errorHandler(args.input);

  const newProduct = new Product(args.input);
  const product = await newProduct.save();

  return product;
};

const updateProduct = async (args, models) => {
  const Product = models.Product;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  errorHandler(input);

  const updatedProduct = await Product.findByIdAndUpdate(id, input);

  if (!updatedProduct) {
    throw new ValidationError(`Product not found`);
  }

  return updatedProduct;
};

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct
};
