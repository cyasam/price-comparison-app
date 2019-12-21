import {
  priceController,
  productController,
  productCategoryController,
  shopController
} from '../../db/controllers/';

const resolvers = {
  Query: {
    prices(_, args) {
      return priceController.getPrices(args);
    }
  },
  Mutation: {
    addPrice(_, args) {
      return priceController.addPrice(args);
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
  }
};

export default resolvers;
