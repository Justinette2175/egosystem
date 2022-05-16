// Initializes the `tagTypes` service on path `/tagTypes`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { TagTypes } from "./tagTypes.class";
import createModel from "../../models/tagTypes.model";
import hooks from "./tagTypes.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    tagTypes: TagTypes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/tagTypes", new TagTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("tagTypes");

  service.hooks(hooks);
}
