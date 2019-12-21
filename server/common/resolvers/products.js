import {
  productController,
  productCategoryController,
  productUnitController
} from '../../db/controllers/';

const resolvers = {
  Query: {
    products(_, args) {
      return productController.getProducts(args);
    }
  },
  Mutation: {
    addProduct(_, args) {
      return productController.addProduct(args);
    }
  },
  Product: {
    productUnit({ productUnitId }) {
      return productUnitController.getProductUnit({ productUnitId });
    },
    productCategory({ productCategoryId }) {
      return productCategoryController.getProductCategory({
        productCategoryId
      });
    }
  }
};

export default resolvers;
