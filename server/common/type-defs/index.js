import { gql } from 'apollo-server';

import PricesDefs from './prices';
import PriceCurrencyDefs from './price-currency';
import ProductDefs from './product';
import ProductUnitDefs from './product-unit';
import ProductCategoriesDefs from './product-categories';
import ShopDefs from './shop';
import UserDefs from './user';
import AuthDefs from './auth';

const typeDefs = gql`
  scalar DateTime

  ${PricesDefs}
  ${PriceCurrencyDefs}
  ${ProductDefs}
  ${ProductUnitDefs}
  ${ProductCategoriesDefs}
  ${ShopDefs}
  ${UserDefs}
  ${AuthDefs}

  # Queries and Mutations
  type Query {
    prices: [Price]!
    products: [Product]!
  }

  type Mutation {
    addPrice(input: newPrice!): Price!
    addPriceCurrency(input: newPriceCurrency!): PriceCurrency!
    addProduct(input: newProduct!): Product!
    addProductUnit(input: newProductUnit!): ProductUnit!
    addProductCategory(input: newProductCategory!): ProductCategory!
    addShop(input: newShop!): Shop!
    signIn(input: signIn!): AuthPayload!
    signUp(input: signUp!): AuthPayload!
  }
`;

export default typeDefs;
