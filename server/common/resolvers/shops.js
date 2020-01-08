import { shopController } from '../../db/controllers/';
import utils from '../../utils';

const resolvers = {
  Mutation: {
    addShop: utils.authenticated((_, args, { models }) => {
      return shopController.addShop(args, models);
    }),
    updateShop: utils.authenticated((_, args, { models }) => {
      return shopController.updateShop(args, models);
    })
  }
};

export default resolvers;
