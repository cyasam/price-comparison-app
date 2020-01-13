import { gql } from 'apollo-server';

const typeDefs = gql`
  type ProductUnit {
    id: ID!
    name: String!
  }

  # Inputs

  input newProductUnit {
    name: String!
  }

  extend type Mutation {
    addProductUnit(input: newProductUnit!): ProductUnit!
    updateProductUnit(id: ID!, input: newProductUnit!): ProductUnit!
  }
`;

export default typeDefs;
