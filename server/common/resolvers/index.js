import { default as priceResolver } from './prices';
import { default as productResolver } from './products';
import { default as productCategoryResolver } from './product-categories';
import { default as productUnitResolver } from './product-units';
import { default as shopResolver } from './shops';

import { GraphQLDateTime } from 'graphql-iso-date';

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    ...priceResolver.Query,
    ...productResolver.Query
  },
  Mutation: {
    ...priceResolver.Mutation,
    ...productResolver.Mutation,
    ...productCategoryResolver.Mutation,
    ...productUnitResolver.Mutation,
    ...shopResolver.Mutation
  },

  Price: { ...priceResolver.Price },
  Product: { ...productResolver.Product }
};

export default resolvers;
