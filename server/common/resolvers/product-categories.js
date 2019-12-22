import { productCategoryController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addProductCategory(_, args, { models }) {
      return productCategoryController.addProductCategory(args, models);
    }
  }
};

export default resolvers;
