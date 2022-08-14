import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";

export class CreateTables1660324657688 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tag_type",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid"
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "person",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid"
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            isNullable: false
          }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "tag",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid"
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            isNullable: false
          },
          {
            name: "tagTypeId",
            type: "uuid",
            isNullable: true
          }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["tagTypeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tag_type",
            onDelete: "CASCADE"
          })
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "person_tags_tag",
        columns: [
          {
            name: "personId",
            type: "uuid"
          },
          {
            name: "tagId",
            type: "uuid"
          }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["tagId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tag",
            onDelete: "CASCADE"
          }),
          new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "person",
            onDelete: "CASCADE"
          })
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
