import { AppDataSource } from "..";
import { TagType } from "../entity/TagType.entity";

export const TagTypeRepository = AppDataSource.getRepository(TagType).extend(
  {}
);
