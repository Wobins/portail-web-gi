/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDefinition = /* GraphQL */ `
  mutation CreateDefinition(
    $input: CreateDefinitionInput!
    $condition: ModelDefinitionConditionInput
  ) {
    createDefinition(input: $input, condition: $condition) {
      id
      term
      meaning
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDefinition = /* GraphQL */ `
  mutation UpdateDefinition(
    $input: UpdateDefinitionInput!
    $condition: ModelDefinitionConditionInput
  ) {
    updateDefinition(input: $input, condition: $condition) {
      id
      term
      meaning
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDefinition = /* GraphQL */ `
  mutation DeleteDefinition(
    $input: DeleteDefinitionInput!
    $condition: ModelDefinitionConditionInput
  ) {
    deleteDefinition(input: $input, condition: $condition) {
      id
      term
      meaning
      createdAt
      updatedAt
      __typename
    }
  }
`;
