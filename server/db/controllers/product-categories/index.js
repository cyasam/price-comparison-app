const getProductCategory = async (args, models) => {
  const ProductCategory = models.ProductCategory;

  const productCategory = await ProductCategory.findById(
    args.productCategoryId
  );

  return productCategory;
};

const addProductCategory = async (args, models) => {
  const ProductCategory = models.ProductCategory;
  const { name } = args.input;

  const existingProductCategory = await ProductCategory.findOne({ name });
  if (existingProductCategory) {
    throw new Error(`${name} product category exist`);
  }

  const newProductCategory = new ProductCategory({ name });
  const productCategory = await newProductCategory.save();
  return productCategory;
};

export default {
  getProductCategory,
  addProductCategory
};
