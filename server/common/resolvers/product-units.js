import { productUnitController } from '../../db/controllers/';
import utils from '../../utils';

const resolvers = {
  Mutation: {
    addProductUnit: utils.authenticated((_, args, { models }) => {
      return productUnitController.addProductUnit(args, models);
    }),
    updateProductUnit: utils.authenticated((_, args, { models }) => {
      return productUnitController.updateProductUnit(args, models);
    })
  }
};

export default resolvers;
