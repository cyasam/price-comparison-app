import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    users: [User]
    user(id: ID, name: String, email: String): User!
  }
`;

export default typeDefs;
