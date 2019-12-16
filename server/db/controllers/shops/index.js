import models from '../../models';

const getShop = async args => {
  const Shop = models.Shop;

  const shop = await Shop.findById(args.shopId);

  return shop;
};

const addShop = async args => {
  const Shop = models.Shop;
  const { name } = args.input;

  const existingShop = await Shop.findOne({ name });
  if (existingShop) {
    throw new Error(`${name} shop exist`);
  }

  const newShop = new Shop({ name });
  const shop = await newShop.save();

  return shop;
};

export default {
  getShop,
  addShop
};
