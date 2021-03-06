import { productCategoryController } from '../../db/controllers/';
import utils from '../../utils';

const resolvers = {
  Mutation: {
    addProductCategory: utils.authenticated((_, args, { models }) => {
      return productCategoryController.addProductCategory(args, models);
    }),
    updateProductCategory: utils.authenticated((_, args, { models }) => {
      return productCategoryController.updateProductCategory(args, models);
    })
  }
};

export default resolvers;
