import { ForbiddenError } from 'apollo-server';

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

  const updatedShop = await Shop.findByIdAndUpdate(args.id, args.input);

  return updatedShop;
};

export default {
  getShop,
  addShop,
  updateShop
};
