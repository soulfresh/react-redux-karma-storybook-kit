# Server Mocks

This folder includes mocks for the GraphQL server APIs (not Rails APIs).

MOCK mode is enabled when running `start-static` or running tests. You can
set the environment variable `REACT_APP_MOCK_APIS` to turn on MOCK mode for
other environments.

## GraphQL

### `/graphql-schema.graphql`

This file defines the GraphQL schema used when mocking. It should match the schema
used in production. If the production schema changes, you can regenerate `graphql-schema.graphql`
by running the command `yarn download-graphql-schema`. You should commit this file
after it is regenerated.

### `./graphql-client-mocks.js`

This file is used to setup the GraphQL client in mock mode.
You shouldn't need to change this file.

### `./graphql-schema-mocks.js`

This file generates the mock objects returned by the GraphQL client when running in MOCK mode.
Feel free to update this file when you want to change how mocks are generated. It is
suggested that the mocks returned here should be somewhat random. During testing,
you should override the mocks to return any specific data you need.

## Rails API

When running the app in mock mode, the Dotfolio API is mocked by running
a local node server (`/mock-backend/http-server.mjs`) that delivers static
json files from `./rest-api`.
