import { Service, SequelizeServiceOptions } from "feathers-sequelize";
import app from "../../app";
import { Application } from "../../declarations";

export class Contacts extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  // async patch(id: any, data: { addTags: string[] }) {
  //   console.log("data", data);
  //   if (data.addTags) {
  //     const afterAdd = await Promise.all(
  //       data.addTags.map((tag_id) =>
  //         app.services.contactTags.Model.create({
  //           contact_id: id,
  //           tag_id,
  //         })
  //       )
  //     );
  //     console.log("afterAdd", afterAdd);
  //   }

  //   return this.get(id);
  // }
}
