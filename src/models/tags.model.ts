// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { CONTACTS_MODEL_NAME } from "./contacts.model";
import { CONTACTS_TAGS_MODEL_NAME } from "./contactTags.model";
import { TAG_TYPES_MODEL_NAME } from "./tagTypes.model";
import { USERS_MODEL_NAME } from "./users.model";

export const TAGS_MODEL_NAME = "tags";

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const tag = sequelizeClient.define(
    TAGS_MODEL_NAME,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tag_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (tag as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    tag.belongsTo(models[USERS_MODEL_NAME], {
      foreignKey: "user_id",
    });
    tag.belongsTo(models[TAG_TYPES_MODEL_NAME], {
      foreignKey: "tag_type_id",
      as: "type",
    });
    tag.belongsToMany(models[CONTACTS_MODEL_NAME], {
      through: CONTACTS_TAGS_MODEL_NAME,
      foreignKey: "tag_id",
    });
  };

  return tag;
}
