import { prop } from '@typegoose/typegoose';
import Street from '@src/model/Street';

class Address {
  @prop({ required: true })
  public state!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ _id: false, required: true })
  public street!: Street;
}

export default Address;
