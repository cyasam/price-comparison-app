import models from '../../models';

const getProducts = async args => {
  const Product = models.Product;

  const product = await Product.find(args);

  return product;
};

const getProduct = async args => {
  const Product = models.Product;

  const product = await Product.findById(args.productId);

  return product;
};

const addProduct = async args => {
  const Product = models.Product;
  const { name } = args.input;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    throw new Error(`${name} product exist`);
  }

  const newProduct = new Product(args.input);
  const product = await newProduct.save();

  return product;
};

export default {
  getProducts,
  getProduct,
  addProduct
};
