import { AppDataSource } from "..";
import { Tag } from "../entity/Tag.entity";
import { TagTypeRepository } from "./tagType.repository";

export const TagRepository = AppDataSource.getRepository(Tag).extend({
  async addTagWithType(name: string, tagTypeId?: string): Promise<Tag> {
    const newTag: Tag = await this.create({ name });
    if (tagTypeId) {
      const tagType = await TagTypeRepository.findOneBy({ id: tagTypeId });
      if (tagType) {
        newTag.tagType = tagType;
      }
    }
    return newTag.save();
  }
});
