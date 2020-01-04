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
`;

export default typeDefs;
