import { getModelForClass, prop } from '@typegoose/typegoose';
import Vehicle from '@src/model/Vehicle';

class Driver {
  @prop({ trim: true })
  public firstname?: string;

  @prop({ trim: true })
  public lastname?: string;

  @prop({ required: true, unique: true, trim: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public phoneNumber?: string;

  @prop()
  public age?: number;

  @prop()
  public license?: string;

  @prop({ _id: false })
  public vehicle?: Vehicle;

  @prop({ default: false })
  public isBlocked?: boolean;

  @prop({ default: true })
  public isVerified?: boolean;
}

const DriverModel = getModelForClass(Driver);

export default DriverModel;
export { Driver };