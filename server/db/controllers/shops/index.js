import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getShop = async (args, models) => {
  const Shop = models.Shop;

  const shop = await Shop.findById(args.shopId);

  return shop;
};

const addShop = async (args, models) => {
  const Shop = models.Shop;
  const { name } = args.input;

  const existingShop = await Shop.findOne({ name });
  if (existingShop) {
    throw new ForbiddenError(`${name} shop exists`);
  }

  const newShop = new Shop(args.input);
  const shop = await newShop.save();

  return shop;
};

const updateShop = async (args, models) => {
  const Shop = models.Shop;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }

  const updatedShop = await Shop.findByIdAndUpdate(id, input);

  if (!updatedShop) {
    throw new ValidationError(`Shop not found`);
  }

  return updatedShop;
};

export default {
  getShop,
  addShop,
  updateShop
};
