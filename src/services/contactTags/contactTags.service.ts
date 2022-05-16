// Initializes the `contacts` service on path `/contacts`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { ContactTags } from "./contactTags.class";
import createModel from "../../models/contactTags.model";
import hooks from "./contactTags.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    contactTags: ContactTags & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/contactTags", new ContactTags(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("contactTags");

  service.hooks(hooks);
}
