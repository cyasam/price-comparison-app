import { gql } from 'apollo-server';

const typeDefs = gql`
  type ProductCategory {
    id: ID!
    name: String!
  }

  # Inputs

  input newProductCategory {
    name: String!
  }

  extend type Mutation {
    addProductCategory(input: newProductCategory!): ProductCategory!
  }
`;

export default typeDefs;
