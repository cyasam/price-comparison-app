import fs from 'fs';
import path from 'path';
import request from 'request';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

import db from '../db';
import models from '../db/models';
import crawlerConfig from './crawler-config';
import { priceController } from '../db/controllers/';

const getCrawlerList = () => {
  const crawlerFileDir = path.join(__dirname, 'crawler.json');
  const listString = fs.readFileSync(crawlerFileDir);
  return JSON.parse(listString);
};

const getPrice = ({ shopId, html }) => {
  let dom = new JSDOM(html);
  const { callback } = crawlerConfig.find(config => config.shopId === shopId);

  return parseFloat(callback(dom.window.document));
};

const startCrawler = async () => {
  dotenv.config({ silent: true });

  const { list: crawlersList } = getCrawlerList();

  await db.connectDB();

  let completedReqs = 0;

  crawlersList.map(
    ({ shopId, productCategoryId, productId, priceCurrencyId, fetchUrl }) => {
      request(fetchUrl, async function(err, res, body) {
        if (err) {
          console.log(err, 'Error occured while hitting URL');
        } else {
          const price = getPrice({ shopId, html: body });
          const result = await priceController.addPrice(
            {
              input: {
                shopId,
                productCategoryId,
                productId,
                price,
                priceCurrencyId
              }
            },
            models
          );

          if (!result) {
            console.log('Error while creating nee price.');
          } else {
            console.log(result);
          }

          completedReqs++;
          if (crawlersList.length === completedReqs) {
            console.log('Crawler process completed.');

            process.exit();
          }
        }
      });
    }
  );
};

startCrawler();
