import { crawlerController } from '../../db/controllers/';

import utils from '../../utils';

const resolvers = {
  Query: {
    crawlers: utils.authenticated((_, args, { models }) => {
      return crawlerController.getCrawlers(args, models);
    })
  },
  Mutation: {
    addCrawler: utils.authenticated((_, args, { models }) => {
      return crawlerController.addCrawler(args, models);
    })
  }
};

export default resolvers;
