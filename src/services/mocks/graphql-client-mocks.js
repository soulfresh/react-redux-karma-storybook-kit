import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MockLink } from '@apollo/react-testing';

import schemaDefinition from '~/graphql-schema.graphql';

import { createMocks } from './graphql-schema-mocks';

/**
 * Generates a mock client that will auto generate fake data
 * for requests against it using the mocks defined in `graphql-mocks.js`.
 * Used to serve a static version of the site for development
 * and can be used to generate data for the storybook.
 *
 * You can get an errorLink that will trigger the global
 * error handler by importing `createErrorLink` from `Home.jsx`.
 */
export function createMockClient(errorLink, cache, additionalMocks, entry) {
  const mocks = createMocks(entry);
  const schema = makeExecutableSchema({ typeDefs: schemaDefinition });
  addMockFunctionsToSchema({
    schema,
    mocks: {
      ...mocks,
      ...additionalMocks
    }
  });

  const mockLink = new SchemaLink({ schema });

  let link = errorLink
    ? ApolloLink.from([errorLink, mockLink])
    : mockLink;

  return new ApolloClient({
    link,
    cache: cache || new InMemoryCache(),
  });
};

/**
 * Generate a mock client for use in tests. This client
 * receives an array of mocks with the following
 * structure:
 *
 * ```js
 * [{
 *   request: {
 *     query: GQL_QUERY,
 *     variables: {
 *       ...variables must match the request exactly
 *     },
 *   },
 *   ...optional properties below
 *   result: {
 *     data: {
 *       ...result data goes here
 *     },
 *   },
 *   error: new Error('your error here'),
 * }]
 * ```
 *
 * You can pass an empty array in order to test the
 * loading state of a request.
 *
 * More information about mocking can be found at:
 * https://www.apollographql.com/docs/react/development-testing/testing/#testing-loading-states
 *
 * You can get an errorLink that will trigger the global
 * error handler by importing `createErrorLink` from `Home.jsx`.
 */
export function createTestClient(m, errorLink, cache) {
  const mockLink = new MockLink(m, false);

  let link = errorLink
    ? ApolloLink.from([errorLink, mockLink])
    : mockLink;

  return new ApolloClient({
    link,
    cache: cache || new InMemoryCache({addTypename: false}),
  });
}
