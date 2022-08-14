import personResolvers from "./modules/person/personResolvers";
import tagResolvers from "./modules/tag/tagResolvers";
import tagTypeResolvers from "./modules/tagType/tagTypeResolvers";

export default {
  Query: {
    ...personResolvers.Query,
    ...tagResolvers.Query,
    ...tagTypeResolvers.Query
  },
  Person: personResolvers.Person,
  Tag: tagResolvers.Tag,
  TagType: tagTypeResolvers.TagType,
  Mutation: {
    ...personResolvers.Mutation,
    ...tagResolvers.Mutation,
    ...tagTypeResolvers.Mutation
  }
};
