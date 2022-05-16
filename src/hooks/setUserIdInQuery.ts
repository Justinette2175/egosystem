import { HookContext } from "@feathersjs/feathers";

export function setUserIdInQuery(context: HookContext): HookContext {
  const userId = context.params.user?.id;
  context.params.query = {
    ...context.params.query,
    user_id: userId,
  };

  return context;
}
