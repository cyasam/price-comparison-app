import { shopController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addShop(_, args) {
      return shopController.addShop(args);
    }
  }
};

export default resolvers;
