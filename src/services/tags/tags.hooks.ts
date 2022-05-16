import * as authentication from "@feathersjs/authentication";
import { setUserIdInData } from "../../hooks/setUserIdInData";
import { setUserIdInQuery } from "../../hooks/setUserIdInQuery";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [setUserIdInQuery],
    get: [setUserIdInQuery],
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
