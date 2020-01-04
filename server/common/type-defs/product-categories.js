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
`;

export default typeDefs;
