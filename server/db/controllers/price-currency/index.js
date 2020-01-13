import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getPriceCurrency = async (args, models) => {
  const PriceCurrency = models.PriceCurrency;

  const priceCurrency = await PriceCurrency.findById(args.priceCurrencyId);

  return priceCurrency;
};

const addPriceCurrency = async (args, models) => {
  const PriceCurrency = models.PriceCurrency;
  const { name } = args.input;

  const existingPriceCurrency = await PriceCurrency.findOne(args.input);
  if (existingPriceCurrency) {
    throw new ForbiddenError(`${name} price currency exists`);
  }

  const newPriceCurrency = new PriceCurrency(args.input);
  const priceCurrency = await newPriceCurrency.save();

  return priceCurrency;
};

const updatePriceCurrency = async (args, models) => {
  const PriceCurrency = models.PriceCurrency;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }
  const updatedPriceCurrency = await PriceCurrency.findByIdAndUpdate(id, input);

  if (!updatedPriceCurrency) {
    throw new ValidationError(`Price currency not found`);
  }

  return updatedPriceCurrency;
};

export default {
  getPriceCurrency,
  addPriceCurrency,
  updatePriceCurrency
};
