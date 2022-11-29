import { getModelForClass, prop } from '@typegoose/typegoose';
import Address from '@src/model/Address';

class Passenger {
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

  @prop()
  public age?: number;

  @prop({ _id: false })
  public address?: Address;

  @prop({ default: false })
  public isBlocked?: boolean;

  @prop({ default: true })
  public isVerified?: boolean;

  @prop({required: true, trim: true})
  public rol!: string;
}

const PassengerModel = getModelForClass(Passenger);

export default PassengerModel;
export { Passenger };
