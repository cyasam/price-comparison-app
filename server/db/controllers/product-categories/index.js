import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getProductCategory = async (args, models) => {
  const ProductCategory = models.ProductCategory;

  const productCategory = await ProductCategory.findById(
    args.productCategoryId
  );

  return productCategory;
};

const addProductCategory = async (args, models) => {
  const ProductCategory = models.ProductCategory;
  const { name } = args.input;

  const existingProductCategory = await ProductCategory.findOne({ name });
  if (existingProductCategory) {
    throw new ForbiddenError(`${name} product category exists`);
  }

  const newProductCategory = new ProductCategory({ name });
  const productCategory = await newProductCategory.save();
  return productCategory;
};

const updateProductCategory = async (args, models) => {
  const ProductCategory = models.ProductCategory;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }
  const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
    id,
    input
  );

  if (!updatedProductCategory) {
    throw new ValidationError(`Product category not found`);
  }

  return updatedProductCategory;
};

export default {
  getProductCategory,
  addProductCategory,
  updateProductCategory
};
