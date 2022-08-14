import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  BaseEntity,
  JoinColumn
} from "typeorm";
import { Person } from "./Person.entity";
import { TagType } from "./TagType.entity";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => TagType, (tagType) => tagType.tags) // note: we will create author property in the Photo class below
  @JoinColumn({ name: "tagTypeId" })
  tagType: TagType;

  @ManyToMany(() => Person, (person) => person.tags)
  persons: Person[];
}
