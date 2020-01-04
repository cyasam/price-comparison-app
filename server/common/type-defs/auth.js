import { gql } from 'apollo-server';

const typeDefs = gql`
  type AuthPayload {
    token: String
    user: User
  }

  # Inputs

  input signIn {
    email: String!
    password: String!
  }

  input signUp {
    email: String!
    password: String!
    name: String!
  }

  extend type Mutation {
    signIn(input: signIn!): AuthPayload!
    signUp(input: signUp!): AuthPayload!
  }
`;

export default typeDefs;
