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
`;

export default typeDefs;
