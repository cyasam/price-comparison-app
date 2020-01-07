import { gql } from 'apollo-server';

const typeDefs = gql`
  type Crawler {
    id: ID!
    shop: Shop!
    productCategory: ProductCategory!
    product: Product!
    currency: PriceCurrency!
    fetchUrl: String!
    createDate: DateTime!
  }

  # Inputs

  input newCrawler {
    shopId: ID!
    productCategoryId: ID!
    productId: ID!
    fetchUrl: String!
    priceCurrencyId: ID!
  }

  extend type Query {
    crawlers: [Crawler]!
  }

  extend type Mutation {
    addCrawler(input: newCrawler!): Crawler!
  }
`;

export default typeDefs;
