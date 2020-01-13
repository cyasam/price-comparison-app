import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getProductUnit = async (args, models) => {
  const ProductUnit = models.ProductUnit;

  const productUnit = await ProductUnit.findById(args.productUnitId);

  return productUnit;
};

const addProductUnit = async (args, models) => {
  const ProductUnit = models.ProductUnit;
  const { name } = args.input;

  const existingProductUnit = await ProductUnit.findOne({ name });
  if (existingProductUnit) {
    throw new ForbiddenError(`${name} product unit exists`);
  }

  const newProductUnit = new ProductUnit({ name });
  const productUnit = await newProductUnit.save();

  return productUnit;
};

const updateProductUnit = async (args, models) => {
  const ProductUnit = models.ProductUnit;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }
  const updatedProductUnit = await ProductUnit.findByIdAndUpdate(id, input);

  if (!updatedProductUnit) {
    throw new ValidationError(`Product unit not found`);
  }

  return updatedProductUnit;
};

export default {
  getProductUnit,
  addProductUnit,
  updateProductUnit
};
