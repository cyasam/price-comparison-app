import { gql } from 'apollo-server';

const typeDefs = gql`
  type PriceCurrency {
    id: ID!
    name: String!
    short: String!
    sign: String
  }

  # Inputs

  input newPriceCurrency {
    name: String!
    short: String!
    sign: String
  }

  extend type Mutation {
    addPriceCurrency(input: newPriceCurrency!): PriceCurrency!
    updatePriceCurrency(id: ID!, input: newPriceCurrency!): PriceCurrency!
  }
`;

export default typeDefs;
