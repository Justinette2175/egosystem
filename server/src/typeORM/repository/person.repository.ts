import { AppDataSource } from "..";
import { Person } from "../entity/Person.entity";
import { Tag } from "../entity/Tag.entity";
import { TagRepository } from "./tag.repository";

type NewTag = {
  name?: string;
  id?: string;
};

export const PersonRepository = AppDataSource.getRepository(Person).extend({
  async addPersonWithTags(name: string, tags?: NewTag[]) {
    let tagsToInsert: Tag[] = [];
    if (tags) {
      tagsToInsert = await Promise.all(
        tags.reduce((acc, tag) => {
          if (tag.id) {
            acc.push(TagRepository.findOneBy({ id: tag.id }));
          } else if (tag.name) {
            acc.push(
              (async () => {
                const newTag = await TagRepository.create({
                  name: tag.name
                });
                return newTag.save();
              })()
            );
          }
          return acc;
        }, [])
      );
    }
    const newPerson = await this.create({
      name
    });
    if (tagsToInsert) {
      newPerson.tags = tagsToInsert;
    }
    return newPerson.save();
  }
});
