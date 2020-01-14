import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    lastSigninDate: DateTime!
  }

  input updateUser {
    name: String
    surname: String
  }

  extend type Query {
    users: [User]!
    user(id: ID, name: String, email: String, surname: String): User
  }

  extend type Mutation {
    updateUser(id: ID!, input: updateUser!): User!
  }
`;

export default typeDefs;
