import { getModelForClass, prop } from '@typegoose/typegoose';
import Vehicle from '@src/model/Vehicle';

class Driver {
  @prop({ required: true, trim: true})
  public name?: string;

  @prop({ required: true, trim: true})
  public lastname?: string;

  @prop({ required: true, unique: true, trim: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({required: true, trim: true})
  public birthday!: string;
  
  @prop({ default: 0 })
  public idProfile?: string;

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
  
  @prop({required: true, trim: true})
  public rol!: string;

  @prop({required: true, trim: true})
  public address!: string;

  @prop({required: true, trim: true})
  public key!: string;
}

const DriverModel = getModelForClass(Driver);

export default DriverModel;
export { Driver };
