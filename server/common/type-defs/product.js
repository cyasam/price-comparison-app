import { gql } from 'apollo-server';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    productUnit: ProductUnit!
    productCategory: ProductCategory!
  }

  # Inputs

  input newProduct {
    name: String!
    productCategoryId: ID!
    productUnitId: ID!
  }

  extend type Query {
    products: [Product]!
  }

  extend type Mutation {
    addProduct(input: newProduct!): Product!
  }
`;

export default typeDefs;
