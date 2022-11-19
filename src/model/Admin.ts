import { getModelForClass, prop } from '@typegoose/typegoose';

class Admin {
  @prop({ trim: true })
  public firstname?: string;

  @prop({ trim: true })
  public lastname?: string;

  @prop({ required: true, unique: true, trim: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;
}

const AdminModel = getModelForClass(Admin);

export default AdminModel;
export { Admin };
