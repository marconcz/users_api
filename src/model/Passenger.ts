import { getModelForClass, prop } from '@typegoose/typegoose';

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

const PassengerModel = getModelForClass(Passenger);

export default PassengerModel;
export { Passenger };
