import { ForbiddenError } from 'apollo-server';

const getPriceCurrency = async (args, models) => {
  const PriceCurrency = models.PriceCurrency;

  const priceCurrency = await PriceCurrency.findById(args.priceCurrencyId);

  return priceCurrency;
};

const addPriceCurrency = async (args, models) => {
  const PriceCurrency = models.PriceCurrency;
  const { name, short } = args.input;

  const existingPriceCurrency = await PriceCurrency.findOne({ name, short });
  if (existingPriceCurrency) {
    throw new ForbiddenError(`${name} price currency exists`);
  }

  const newPriceCurrency = new PriceCurrency({ name, short });
  const priceCurrency = await newPriceCurrency.save();

  return priceCurrency;
};

export default {
  getPriceCurrency,
  addPriceCurrency
};
