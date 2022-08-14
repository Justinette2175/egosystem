import { gql } from "apollo-server";

export const tagTypeType = gql`
  type TagType {
    name: String
    tags: [Tag]
    id: String
  }
  type Mutation {
    addTagType(name: String!): TagType
  }
`;
