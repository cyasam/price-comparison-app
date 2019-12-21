import { productUnitController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addProductUnit(_, args) {
      return productUnitController.addProductUnit(args);
    }
  }
};

export default resolvers;
