import { prop } from '@typegoose/typegoose';

class Vehicle {
  @prop({ required: true })
  public vin!: string;

  @prop({ required: true })
  public model!: string;

  @prop({ required: true })
  public year!: string;
}

export default Vehicle;
