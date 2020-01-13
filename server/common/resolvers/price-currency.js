import { priceCurrencyController } from '../../db/controllers/';
import utils from '../../utils';

const resolvers = {
  Mutation: {
    addPriceCurrency: utils.authenticated((_, args, { models }) => {
      return priceCurrencyController.addPriceCurrency(args, models);
    }),
    updatePriceCurrency: utils.authenticated((_, args, { models }) => {
      return priceCurrencyController.updatePriceCurrency(args, models);
    })
  }
};

export default resolvers;
