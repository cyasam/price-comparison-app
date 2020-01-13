import { ForbiddenError, ValidationError } from 'apollo-server';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const getCrawlers = async (args, models) => {
  const Crawler = models.Crawler;

  const crawlers = await Crawler.find(args);

  return crawlers;
};

const addCrawler = async (args, models) => {
  const Crawler = models.Crawler;
  const { fetchUrl } = args.input;

  const existingCrawler = await Crawler.findOne({ fetchUrl });
  if (existingCrawler) {
    throw new ForbiddenError(`Crawler exists`);
  }

  const newCrawler = new Crawler({
    ...args.input,
    createDate: new Date().toISOString()
  });
  const crawler = await newCrawler.save();

  return crawler;
};

const updateCrawler = async (args, models) => {
  const Crawler = models.Crawler;
  const { id, input } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  } else if (!ObjectId.isValid(input.shopId)) {
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
  const updatedCrawler = await Crawler.findByIdAndUpdate(id, input);

  if (!updatedCrawler) {
    throw new ValidationError(`Crawler not found`);
  }

  return updatedCrawler;
};

const updateCrawlerSuccessProcessDate = async (args, models) => {
  const Crawler = models.Crawler;
  const { id } = args;

  if (!id) {
    throw new ValidationError(`Please enter id`);
  } else if (!ObjectId.isValid(id)) {
    throw new ValidationError(`id: ${id} not valid`);
  }
  const updatedCrawler = await Crawler.findByIdAndUpdate(id, {
    $set: { successProcessDate: new Date().toISOString() }
  });

  if (!updatedCrawler) {
    throw new ValidationError(`Crawler not found`);
  }

  return updatedCrawler;
};

export default {
  getCrawlers,
  addCrawler,
  updateCrawler,
  updateCrawlerSuccessProcessDate
};
