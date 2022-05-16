// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { CONTACTS_MODEL_NAME } from "./contacts.model";
import { TAGS_MODEL_NAME } from "./tags.model";

export const CONTACTS_TAGS_MODEL_NAME = "contactTags";
export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const contactTag = sequelizeClient.define(
    CONTACTS_TAGS_MODEL_NAME,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      contact_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (contactTag as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return contactTag;
}
