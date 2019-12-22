import { shopController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addShop(_, args, { models }) {
      return shopController.addShop(args, models);
    }
  }
};

export default resolvers;
