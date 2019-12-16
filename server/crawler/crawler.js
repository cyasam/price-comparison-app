export default [
  {
    shopId: '5df6566ce5fc8a44e858c98d',
    callback($) {
      const selector = '.product-details-cont .item-price';
      const price = $(selector).attr('content');

      return price;
    }
  },
  {
    shopId: '5df6816174812f1d30aabe02',
    callback($) {
      const selector = '#store-product-primary-price';
      const priceText = $(selector).text();

      const price = priceText.replace(' TL', '').replace(',', '.');

      return price;
    }
  }
];
