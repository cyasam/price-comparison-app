import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar DateTime

  type Price {
    id: ID!
    shop: Shop!
    productCategory: ProductCategory!
    product: Product!
    price: Float!
    createDate: DateTime!
  }

  type Product {
    id: ID!
    name: String!
    productUnit: ProductUnit!
    productCategory: ProductCategory!
  }

  type ProductUnit {
    id: ID!
    name: String!
  }

  type ProductCategory {
    id: ID!
    name: String!
  }

  type Shop {
    id: ID!
    name: String!
  }

  # Inputs

  input newPrice {
    shopId: ID!
    productCategoryId: ID!
    productId: ID!
    price: Float!
  }

  input newProduct {
    name: String!
    productCategoryId: ID!
    productUnitId: ID!
  }

  input newProductUnit {
    name: String!
  }

  input newProductCategory {
    name: String!
  }

  input newShop {
    name: String!
  }

  # Queries and Mutations
  type Query {
    prices: [Price]!
    products: [Product]!
  }

  type Mutation {
    addPrice(input: newPrice!): Price!
    addProduct(input: newProduct!): Product!
    addProductUnit(input: newProductUnit!): ProductUnit!
    addProductCategory(input: newProductCategory!): ProductCategory!
    addShop(input: newShop!): Shop!
  }
`;

export default typeDefs;
