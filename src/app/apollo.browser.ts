import 'isomorphic-fetch';

import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4200/api/graphql'
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      if ('token' in currentUser) {
        req.options.headers['authorization'] = 'bearer ' + currentUser.token;
      }
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  // initialState: window['__APOLLO_STATE__']
});

export function provideClient(): ApolloClient {
  return client;
}
