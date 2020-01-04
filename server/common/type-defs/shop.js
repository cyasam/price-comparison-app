import { gql } from 'apollo-server';

const typeDefs = gql`
  type Shop {
    id: ID!
    name: String!
  }

  # Inputs

  input newShop {
    name: String!
  }

  extend type Mutation {
    addShop(input: newShop!): Shop!
  }
`;

export default typeDefs;
