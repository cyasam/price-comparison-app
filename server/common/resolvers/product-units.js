import { productUnitController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addProductUnit(_, args, { models }) {
      return productUnitController.addProductUnit(args, models);
    }
  }
};

export default resolvers;
