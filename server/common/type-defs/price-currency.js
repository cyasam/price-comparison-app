import { gql } from 'apollo-server';

const typeDefs = gql`
  type PriceCurrency {
    id: ID!
    name: String!
    short: String!
  }

  # Inputs

  input newPriceCurrency {
    name: String!
    short: String!
  }

  extend type Mutation {
    addPriceCurrency(input: newPriceCurrency!): PriceCurrency!
  }
`;

export default typeDefs;
