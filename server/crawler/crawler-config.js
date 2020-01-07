export default [
  {
    shopId: '5df6566ce5fc8a44e858c98d',
    callback(document) {
      const selector = '.product-details-cont .item-price';
      const price = document.querySelector(selector).getAttribute('content');

      return price;
    }
  },
  {
    shopId: '5df6816174812f1d30aabe02',
    callback(document) {
      const selector = '#store-product-primary-price';
      const priceText = document.querySelector(selector).textContent;

      const price = priceText.replace(' TL', '').replace(',', '.');

      return price;
    }
  },
  {
    shopId: '5e14387c43bf242600f02673',
    callback(document) {
      const selector = '.product-price-wrapper #offering-price';
      const price = document.querySelector(selector).getAttribute('content');

      return price;
    }
  }
];
