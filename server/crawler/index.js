import request from 'request';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

import db from '../db';
import * as models from '../db/models';

import {
  priceController,
  crawlerController,
  shopController
} from '../db/controllers/';

const getCrawlerList = async () => {
  try {
    let crawlers = await crawlerController.getCrawlers(null, models);
    return crawlers;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getPrice = async ({ shopId, html }) => {
  let dom = new JSDOM(html);
  const shop = await shopController.getShop(
    { shopId: shopId.toString() },
    models
  );

  const callback = new Function('document', shop.crawlerCallback);

  return parseFloat(callback(dom.window.document));
};

const startCrawler = async () => {
  try {
    dotenv.config({ silent: true });

    await db.connectDB();

    const crawlersList = await getCrawlerList();

    let completedReqs = 0;

    crawlersList.map(
      ({ shopId, productCategoryId, productId, priceCurrencyId, fetchUrl }) => {
        request(fetchUrl, async function(err, res, html) {
          if (err) {
            console.log(err, 'Error occured while hitting URL');
          } else {
            const price = await getPrice({ shopId, html });

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
  } catch (err) {
    throw new Error(err.message);
  }
};

startCrawler();
