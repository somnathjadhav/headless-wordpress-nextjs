import { getApolloClient } from '@faustwp/core';

const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:10013';

export const client = getApolloClient({
  uri: `${wpUrl}/graphql`,
  fetchPolicy: 'cache-and-network',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
