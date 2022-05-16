// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/hooks";
import { USERS_MODEL_NAME } from "./users.model";
import { TAGS_MODEL_NAME } from "./tags.model";
import { CONTACTS_TAGS_MODEL_NAME } from "./contactTags.model";

export const CONTACTS_MODEL_NAME = "contacts";
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const contact = sequelizeClient.define(
    CONTACTS_MODEL_NAME,
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
    },
    {
      timestamps: true,
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (contact as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    contact.belongsTo(models[USERS_MODEL_NAME], {
      foreignKey: "user_id",
    });
    contact.belongsToMany(models[TAGS_MODEL_NAME], {
      through: CONTACTS_TAGS_MODEL_NAME,
      foreignKey: "contact_id",
    });
  };

  return contact;
}
