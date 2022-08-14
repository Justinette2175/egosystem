import { gql } from "apollo-server";
import { personType } from "./modules/person/personType";
import { tagType } from "./modules/tag/tagType";
import { tagTypeType } from "./modules/tagType/tagTypeType";

const graphqlTypes = gql`
  input TagInput {
    name: String
    id: String
  }
  type Query {
    persons: [Person]
    person(id: String): Person
    tags: [Tag]
    tag(id: String): Tag
    tagTypes: [TagType]
    tagType(id: String): TagType
  }
`;

export default [graphqlTypes, tagTypeType, tagType, personType];
