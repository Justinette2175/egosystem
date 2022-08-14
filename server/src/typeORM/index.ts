require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Person } from "./entity/Person.entity";
import { Tag } from "./entity/Tag.entity";
import { TagType } from "./entity/TagType.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: process.env.PGPORT as unknown as number,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [Person, Tag, TagType],
  synchronize: false,
  logging: false
  // migrationsRun: true,
  // migrations: ["../migrations/*.ts"]
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
