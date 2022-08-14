import { gql } from "apollo-server";

export const tagType = gql`
  type Tag {
    name: String
    type: TagType
    id: String
    persons: [Person]
  }
  type Mutation {
    addTag(name: String!, tagTypeId: String): Tag
    updateTagType(id: String!, tagTypeId: String!): Tag
  }
`;
