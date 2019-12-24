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

  const newShop = new Shop({ name });
  const shop = await newShop.save();

  return shop;
};

export default {
  getShop,
  addShop
};
