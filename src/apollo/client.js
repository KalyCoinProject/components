import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { SUBGRAPH_BASE_URL } from 'src/constants';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${SUBGRAPH_BASE_URL}/exchange`,
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.kalychain.io/subgraphs/name/kalyswap/kalychain-blocks',
  }),
  cache: new InMemoryCache(),
});
