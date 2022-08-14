import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";

import { Tag } from "./Tag.entity";

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Tag, (tag) => tag.persons)
  @JoinTable({
    name: "person_tags_tag",
    joinColumn: {
      name: "personId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id"
    }
  })
  tags: Tag[];
}
