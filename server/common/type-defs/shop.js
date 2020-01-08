import { gql } from 'apollo-server';

const typeDefs = gql`
  type Shop {
    id: ID!
    name: String!
  }

  # Inputs

  input newShop {
    name: String!
    crawlerCallback: String!
  }

  input updateShop {
    name: String!
    crawlerCallback: String!
  }

  extend type Mutation {
    addShop(input: newShop!): Shop!
    updateShop(id: ID!, input: updateShop!): Shop!
  }
`;

export default typeDefs;
