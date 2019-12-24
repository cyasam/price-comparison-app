import { ForbiddenError } from 'apollo-server';

const getProducts = async (args, models) => {
  const Product = models.Product;

  const product = await Product.find(args);

  return product;
};

const getProduct = async (args, models) => {
  const Product = models.Product;

  const product = await Product.findById(args.productId);

  return product;
};

const addProduct = async (args, models) => {
  const Product = models.Product;
  const { name } = args.input;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    throw new ForbiddenError(`${name} product exists`);
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
