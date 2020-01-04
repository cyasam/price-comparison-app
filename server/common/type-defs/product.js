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
`;

export default typeDefs;
