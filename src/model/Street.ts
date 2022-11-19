import { prop } from '@typegoose/typegoose';

class Street {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public number!: string;

  @prop({ required: true })
  public appartment!: string;
}

export default Street;
