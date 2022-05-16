import { HookContext } from "@feathersjs/feathers";

export function setUserIdInData(context: HookContext): HookContext {
  context.data.user_id = context.params.user?.id;
  return context;
}
