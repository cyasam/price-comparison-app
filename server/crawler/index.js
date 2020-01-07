import request from 'request';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv';

import db from '../db';
import models from '../db/models';
import crawlerConfig from './crawler-config';
import { priceController, crawlerController } from '../db/controllers/';

const getCrawlerList = async () => {
  try {
    let crawlers = await crawlerController.getCrawlers(null, models);
    return crawlers;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getPrice = ({ shopId, html }) => {
  let dom = new JSDOM(html);
  const crawler = crawlerConfig.find(
    config => config.shopId === shopId.toString()
  );

  return parseFloat(crawler.callback(dom.window.document));
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
            const price = getPrice({ shopId, html });
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
