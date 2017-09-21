import 'isomorphic-fetch';

import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4200/api/graphql'
});

const client = new ApolloClient({
  networkInterface,
  // initialState: window['__APOLLO_STATE__']
});

export function provideClient(): ApolloClient {
  return client;
}
