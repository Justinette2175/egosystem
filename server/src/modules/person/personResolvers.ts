import { Person } from "../../typeORM/entity/Person.entity";
import { PersonRepository } from "../../typeORM/repository/person.repository";

export default {
  Query: {
    person: (id: string) => {
      return PersonRepository.findOne({
        where: { id },
        relations: {
          tags: true
        }
      });
    },
    persons: () => {
      return PersonRepository.find({
        relations: {
          tags: true
        }
      });
    }
  },
  Person: {
    tags: async (parent: Person) => {
      if (parent.tags) {
        return parent.tags;
      } else {
        const person = await PersonRepository.findOne({
          relations: { tags: true },
          where: { id: parent.id }
        });
        return person.tags;
      }
    }
  },
  Mutation: {
    addPerson: async (
      _: any,
      args: { name: string; tags?: { name?: string; id?: string }[] }
    ) => {
      const { tags, name } = args;
      return PersonRepository.addPersonWithTags(name, tags);
    }
  }
};
