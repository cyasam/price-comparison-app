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
  type Query

  type Mutation
`;

export default typeDefs;
