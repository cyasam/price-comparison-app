import {
  priceController,
  productController,
  productCategoryController,
  shopController
} from '../../db/controllers/';

const resolvers = {
  Query: {
    prices(_, args, { models }) {
      return priceController.getPrices(args, models);
    }
  },
  Mutation: {
    addPrice(_, args, { models }) {
      return priceController.addPrice(args, models);
    }
  },
  Price: {
    product({ productId }, __, { models }) {
      return productController.getProduct({ productId }, models);
    },
    productCategory({ productCategoryId }, __, { models }) {
      return productCategoryController.getProductCategory(
        {
          productCategoryId
        },
        models
      );
    },
    shop({ shopId }, __, { models }) {
      return shopController.getShop({ shopId }, models);
    }
  }
};

export default resolvers;
