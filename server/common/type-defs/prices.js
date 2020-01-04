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

  extend type Query {
    prices: [Price]!
  }

  extend type Mutation {
    addPrice(input: newPrice!): Price!
  }
`;

export default typeDefs;
