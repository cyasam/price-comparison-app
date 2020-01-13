import { ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const errorHandler = input => {
  if (!ObjectId.isValid(input.shopId)) {
    throw new ValidationError(`shopId: ${input.shopId} not valid`);
  } else if (!ObjectId.isValid(input.productCategoryId)) {
    throw new ValidationError(
      `productCategoryId: ${input.productCategoryId} not valid`
    );
  } else if (!ObjectId.isValid(input.productId)) {
    throw new ValidationError(`productId: ${input.productId} not valid`);
  } else if (!ObjectId.isValid(input.priceCurrencyId)) {
    throw new ValidationError(
      `priceCurrencyId: ${input.priceCurrencyId} not valid`
    );
  }
};

const getPrices = async (args, models) => {
  const Price = models.Price;

  const price = await Price.find(args);

  return price;
};

const addPrice = async (args, models) => {
  const Price = models.Price;
  const { input } = args;

  errorHandler(input);

  const newPrice = new Price({
    ...input,
    createDate: new Date().toISOString()
  });
  const price = await newPrice.save();

  return price;
};

const updatePrice = async (args, models) => {
  const Price = models.Price;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  errorHandler(input);

  const updatedPrice = await Price.findByIdAndUpdate(id, input);

  if (!updatedPrice) {
    throw new ValidationError(`Price not found`);
  }

  return updatedPrice;
};

export default {
  getPrices,
  addPrice,
  updatePrice
};
