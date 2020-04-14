import request from 'request';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

import db from '../db';
import * as models from '../db/models';

import {
  priceController,
  crawlerController,
  shopController,
} from '../db/controllers/';

const getCrawlerList = async () => {
  try {
    let crawlers = await crawlerController.getCrawlers(null, models);
    if (!crawlers) {
      throw new Error('Crawlers not found');
    }

    return crawlers;
  } catch (err) {
    console.log(err.message);
  }
};

const getPrice = async ({ shopId, html }) => {
  try {
    let dom = new JSDOM(html);
    const shop = await shopController.getShop(
      { shopId: shopId.toString() },
      models
    );

    if (!dom) {
      throw new Error('DOM not found');
    }

    const callback = new Function('document', shop.crawlerCallback);

    const price = parseFloat(callback(dom.window.document));

    return price;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

const startCrawler = async () => {
  try {
    dotenv.config({ silent: true });

    await db.connectDB();

    const crawlersList = await getCrawlerList();

    let completedReqs = 0;

    crawlersList.map(
      ({
        _id,
        shopId,
        productCategoryId,
        productId,
        priceCurrencyId,
        fetchUrl,
      }) => {
        request(
          {
            uri: fetchUrl,
            followAllRedirects: true,
          },
          async function (err, res, html) {
            try {
              if (err) {
                throw new Error('Error occured while requesting.');
              } else if (
                !res ||
                res.statusCode >= 400 ||
                res.request._redirect.redirects.length
              ) {
                throw new Error('Page not found.');
              }

              const price = await getPrice({ shopId, html });

              if (!price) {
                throw new Error('Price not gettting.');
              }

              const result = await priceController.addPrice(
                {
                  input: {
                    shopId,
                    productCategoryId,
                    productId,
                    price,
                    priceCurrencyId,
                  },
                },
                models
              );

              if (!result) {
                throw new Error('Error while creating new price.');
              } else {
                const updatedCrawler = await crawlerController.updateCrawlerSuccessProcessDate(
                  {
                    id: _id,
                  },
                  models
                );

                if (!updatedCrawler) {
                  throw new Error(
                    'Error while updating new successProcessDate.'
                  );
                }

                console.log(result);
              }

              completedReqs++;
              if (crawlersList.length === completedReqs) {
                console.log('Crawler process completed.');

                process.exit();
              }
            } catch (err) {
              console.log(`${err.message} URL: ${fetchUrl}`);
            }
          }
        );
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

startCrawler();
