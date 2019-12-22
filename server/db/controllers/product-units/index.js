const getProductUnit = async (args, models) => {
  const ProductUnit = models.ProductUnit;

  const productUnit = await ProductUnit.findById(args.productUnitId);

  return productUnit;
};

const addProductUnit = async (args, models) => {
  const ProductUnit = models.ProductUnit;
  const { name } = args.input;

  const existingProductUnit = await ProductUnit.findOne({ name });
  if (existingProductUnit) {
    throw new Error(`${name} product unit exist`);
  }

  const newProductUnit = new ProductUnit({ name });
  const productUnit = await newProductUnit.save();

  return productUnit;
};

export default {
  getProductUnit,
  addProductUnit
};
