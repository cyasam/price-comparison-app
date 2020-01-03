export default [
  {
    shopId: '5e0e86df7d1e9a250c413ab1',
    callback(document) {
      const selector = '.product-price-wrapper #offering-price';
      const price = document.querySelector(selector).getAttribute('content');

      return price;
    }
  }
];
