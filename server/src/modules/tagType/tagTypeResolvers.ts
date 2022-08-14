import { TagType } from "../../typeORM/entity/TagType.entity";
import { TagTypeRepository } from "../../typeORM/repository/tagType.repository";

export default {
  Query: {
    tagType: async (id: string) => {
      return TagTypeRepository.findBy({ id });
    },
    tagTypes: async () => {
      return TagTypeRepository.find();
    }
  },
  TagType: {
    tags: async (parent: TagType) => {
      const tagTypeWithTags = await TagTypeRepository.findOne({
        where: { id: parent.id },
        relations: { tags: true }
      });
      return tagTypeWithTags.tags;
    }
  },
  Mutation: {
    addTagType: async (_: any, { name }: { name: string }) => {
      const newTagType = await TagTypeRepository.create({
        name
      });

      return newTagType.save();
    }
  }
};
