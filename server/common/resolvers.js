import { GraphQLDateTime } from 'graphql-iso-date';

import {
  priceController,
  productController,
  productCategoryController,
  productUnitController,
  shopController
} from '../db/controllers/';

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    prices(_, args) {
      return priceController.getPrices(args);
    },
    products(_, args) {
      return productController.getProducts(args);
    }
  },
  Mutation: {
    addPrice(_, args) {
      return priceController.addPrice(args);
    },
    addProduct(_, args) {
      return productController.addProduct(args);
    },
    addProductUnit(_, args) {
      return productUnitController.addProductUnit(args);
    },
    addProductCategory(_, args) {
      return productCategoryController.addProductCategory(args);
    },
    addShop(_, args) {
      return shopController.addShop(args);
    }
  },
  Price: {
    product({ productId }) {
      return productController.getProduct({ productId });
    },
    productCategory({ productCategoryId }) {
      return productCategoryController.getProductCategory({
        productCategoryId
      });
    },
    shop({ shopId }) {
      return shopController.getShop({ shopId });
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
