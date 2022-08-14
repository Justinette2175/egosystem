import { gql } from "apollo-server";

export const personType = gql`
  type Person {
    name: String
    tags: [Tag]
    id: String
  }
  type Mutation {
    addPerson(name: String!, tags: [TagInput]): Person
  }
`;
