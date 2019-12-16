import fs from 'fs';
import path from 'path';
import request from 'request';
import cheerio from 'cheerio';

import db from '../db';
import crawlerConfig from './crawler';
import { priceController } from '../db/controllers/';

const getCrawlerList = dir => {
  const listString = fs.readFileSync(dir);
  return JSON.parse(listString);
};

const getPrice = ({ shopId, html }) => {
  let $ = cheerio.load(html);
  const { callback } = crawlerConfig.find(config => config.shopId === shopId);

  return parseFloat(callback($));
};

const startCrawler = async () => {
  const crawlerFileDir = path.join(__dirname, 'crawler.json');
  const { list: crawlersList } = getCrawlerList(crawlerFileDir);

  await db.connectDB();

  crawlersList.map(({ shopId, productCategoryId, productId, fetchUrl }) => {
    request(fetchUrl, async function(err, res, body) {
      if (err) {
        console.log(err, 'Error occured while hitting URL');
      } else {
        const price = getPrice({ shopId, html: body });
        const result = await priceController.addPrice({
          input: {
            shopId,
            productCategoryId,
            productId,
            price
          }
        });

        if (!result) {
          console.log('Error while creating nee price.');
        } else {
          console.log(result);
        }
      }
    });
  });
};

export default startCrawler;
