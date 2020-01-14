import { default as priceResolver } from './prices';
import { default as priceCurrencyResolver } from './price-currency';
import { default as productResolver } from './products';
import { default as productCategoryResolver } from './product-categories';
import { default as productUnitResolver } from './product-units';
import { default as shopResolver } from './shops';
import { default as authResolver } from './auth';
import { default as crawlerResolver } from './crawler';
import { default as userResolver } from './user';
import { commonResolvers } from './common.js';

import { GraphQLDateTime } from 'graphql-iso-date';

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    ...priceResolver.Query,
    ...productResolver.Query,
    ...crawlerResolver.Query,
    ...userResolver.Query
  },
  Mutation: {
    ...priceResolver.Mutation,
    ...priceCurrencyResolver.Mutation,
    ...productResolver.Mutation,
    ...productCategoryResolver.Mutation,
    ...productUnitResolver.Mutation,
    ...shopResolver.Mutation,
    ...authResolver.Mutation,
    ...crawlerResolver.Mutation
  },

  Price: { ...commonResolvers },
  Crawler: { ...commonResolvers },
  Product: { ...productResolver.Product }
};

export default resolvers;
