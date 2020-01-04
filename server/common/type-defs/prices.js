import { gql } from 'apollo-server';

const typeDefs = gql`
  type Price {
    id: ID!
    shop: Shop!
    productCategory: ProductCategory!
    product: Product!
    price: Float!
    currency: PriceCurrency!
    createDate: DateTime!
  }

  # Inputs

  input newPrice {
    shopId: ID!
    productCategoryId: ID!
    productId: ID!
    price: Float!
    priceCurrencyId: ID!
  }
`;

export default typeDefs;
