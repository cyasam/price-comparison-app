const getPrices = async (args, models) => {
  const Price = models.Price;

  const price = await Price.find(args);

  return price;
};

const addPrice = async (args, models) => {
  const Price = models.Price;

  const newPrice = new Price({
    ...args.input,
    createDate: new Date().toISOString()
  });
  const price = await newPrice.save();

  return price;
};

export default {
  getPrices,
  addPrice
};
