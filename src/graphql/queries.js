/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDefinition = /* GraphQL */ `
  query GetDefinition($id: ID!) {
    getDefinition(id: $id) {
      id
      term
      meaning
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDefinitions = /* GraphQL */ `
  query ListDefinitions(
    $filter: ModelDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDefinitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        term
        meaning
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
