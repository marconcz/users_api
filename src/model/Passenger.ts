import { getModelForClass, prop } from '@typegoose/typegoose';
import Address from '@src/model/Address';

class Passenger {
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

  @prop({ _id: false })
  public address?: Address;

  @prop({ default: false })
  public isBlocked?: boolean;

  @prop({ default: true })
  public isVerified?: boolean;
}

const PassengerModel = getModelForClass(Passenger);

export default PassengerModel;
export { Passenger };
