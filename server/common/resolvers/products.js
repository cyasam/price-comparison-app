import {
  productController,
  productCategoryController,
  productUnitController
} from '../../db/controllers/';
import utils from '../../utils';

const resolvers = {
  Query: {
    products(_, args, { models }) {
      return productController.getProducts(args, models);
    }
  },
  Mutation: {
    addProduct: utils.authenticated((_, args, { models }) => {
      return productController.addProduct(args, models);
    })
  },
  Product: {
    productUnit({ productUnitId }, __, { models }) {
      return productUnitController.getProductUnit({ productUnitId }, models);
    },
    productCategory({ productCategoryId }, __, { models }) {
      return productCategoryController.getProductCategory(
        {
          productCategoryId
        },
        models
      );
    }
  }
};

export default resolvers;
