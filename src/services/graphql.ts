import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const WORDPRESS_GRAPHQL_URL = 'https://instaltancaments.com/graphql';

const httpLink = createHttpLink({
  uri: WORDPRESS_GRAPHQL_URL,
  credentials: 'omit',
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}, Operation: ${operation.operationName}`
      );
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    console.error('Operation:', operation.operationName);
    console.error('Variables:', operation.variables);
    console.error('Headers:', operation.getContext().headers);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2luc3RhbHRhbmNhbWVudHMuY29tIiwiaWF0IjoxNzQ3NTQ1NjU4LCJuYmYiOjE3NDc1NDU2NTgsImV4cCI6MTc0ODE1MDQ1OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.aCtPeC2n_cxlmuH9wTPcA_JmQsQnp71wrrO9oW8tHlo';
  
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true
}); 