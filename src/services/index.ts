import { Application } from "../declarations";
import users from "./users/users.service";
import contacts from "./contacts/contacts.service";
import tagTypes from "./tagTypes/tagTypes.service";
import tags from "./tags/tags.service";
import contactTags from "./contactTags/contactTags.service";

// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(contacts);
  app.configure(tagTypes);
  app.configure(tags);
  app.configure(contactTags);
}
