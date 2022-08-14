import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Tag } from "./Tag.entity";

@Entity()
export class TagType extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Tag, (tag) => tag.tagType)
  tags: Tag[];
}
