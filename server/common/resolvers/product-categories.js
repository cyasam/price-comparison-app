import { productCategoryController } from '../../db/controllers/';

const resolvers = {
  Mutation: {
    addProductCategory(_, args) {
      return productCategoryController.addProductCategory(args);
    }
  }
};

export default resolvers;
