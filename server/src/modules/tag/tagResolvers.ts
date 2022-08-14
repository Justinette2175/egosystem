import { Tag } from "../../typeORM/entity/Tag.entity";
import { TagRepository } from "../../typeORM/repository/tag.repository";
import { TagTypeRepository } from "../../typeORM/repository/tagType.repository";

export default {
  Query: {
    tag: async (id: string) => {
      const tag = await TagRepository.find({
        where: { id },
        relations: { tagType: true }
      });
      return tag;
    },
    tags: () => {
      return TagRepository.find({ relations: { tagType: true } });
    }
  },
  Tag: {
    type: async (parent: Tag) => {
      if (parent.tagType) {
        return parent.tagType;
      } else {
        const tagToReturn = await TagRepository.findOne({
          where: { id: parent.id },
          relations: {
            tagType: true
          }
        });
        return tagToReturn.tagType;
      }
    },
    persons: async (parent: Tag) => {
      const tagWithPersons = await TagRepository.findOne({
        where: { id: parent.id },
        relations: {
          persons: true
        }
      });
      return tagWithPersons.persons;
    }
  },
  Mutation: {
    addTag: async (
      _: any,
      { name, tagTypeId }: { name: string; tagTypeId?: string }
    ) => {
      return TagRepository.addTagWithType(name, tagTypeId);
    },
    updateTagType: async (
      _: any,
      { id, tagTypeId }: { id: string; tagTypeId: string }
    ) => {
      const tag = await TagRepository.findOneBy({ id });
      const tagType = await TagTypeRepository.findOneBy({ id: tagTypeId });
      tag.tagType = tagType;
      return tag.save();
    }
  }
};
