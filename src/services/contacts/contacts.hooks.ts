import * as authentication from "@feathersjs/authentication";
import { HookContext } from "@feathersjs/feathers";
import { setUserIdInData } from "../../hooks/setUserIdInData";
import { setUserIdInQuery } from "../../hooks/setUserIdInQuery";
import { TAGS_MODEL_NAME } from "../../models/tags.model";
import { TAG_TYPES_MODEL_NAME } from "../../models/tagTypes.model";
import { USERS_MODEL_NAME } from "../../models/users.model";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

function withContactTags(context: HookContext): HookContext {
  // Get the Sequelize instance. In the generated application via:
  const sequelize = context.app.get("sequelizeClient");

  context.params.sequelize = {
    raw: false,
    attributes: ["name"],
    include: [
      {
        model: sequelize.models[TAGS_MODEL_NAME],
        attributes: ["name"],
        include: [
          {
            model: sequelize.models[TAG_TYPES_MODEL_NAME],
            attributes: ["name"],
            as: "type",
          },
        ],
      },
      {
        model: sequelize.models[USERS_MODEL_NAME],
        attributes: ["email"],
      },
    ],
  };

  return context;
}

export default {
  before: {
    all: [authenticate("jwt")],
    find: [setUserIdInQuery, withContactTags],
    get: [setUserIdInQuery, withContactTags],
    create: [setUserIdInData],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
