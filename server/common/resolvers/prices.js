import { priceController } from '../../db/controllers/';

import utils from '../../utils';

const resolvers = {
  Query: {
    prices(_, args, { models }) {
      return priceController.getPrices(args, models);
    }
  },
  Mutation: {
    addPrice: utils.authenticated((_, args, { models }) => {
      return priceController.addPrice(args, models);
    }),
    updatePrice: utils.authenticated((_, args, { models }) => {
      return priceController.updatePrice(args, models);
    })
  }
};

export default resolvers;
