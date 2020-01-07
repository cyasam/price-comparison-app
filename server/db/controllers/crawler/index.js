import { ForbiddenError } from 'apollo-server';

import utils from '../../../utils';

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

  await utils.createCrawlerJSON();

  return crawler;
};

export default {
  getCrawlers,
  addCrawler
};
