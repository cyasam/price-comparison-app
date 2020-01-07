import {
  priceCurrencyController,
  productController,
  productCategoryController,
  shopController
} from '../../db/controllers/';

export const commonResolvers = {
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
  },
  currency({ priceCurrencyId }, __, { models }) {
    return priceCurrencyController.getPriceCurrency(
      { priceCurrencyId },
      models
    );
  }
};
