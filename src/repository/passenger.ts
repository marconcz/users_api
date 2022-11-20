import { DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import { UpdateQuery } from 'mongoose';
import PassengerModel, { Passenger } from '@src/model/Passenger';

type UpdateType = UpdateQuery<DocumentType<Passenger, BeAnObject>> | undefined;

const save = async (passenger: Passenger) => {
  const passengerSaved = await PassengerModel.create(passenger);
  return passengerSaved;
};

const findOneByEmail = async (email: string) => {
  const passengerSaved = await PassengerModel.findOne({ email });
  return passengerSaved;
};

const findOneAndUpdate = async (id: string, passenger: UpdateType) => {
  const passengerSaved = await PassengerModel.findOneAndUpdate(
    { _id: id },
    passenger,
    { new: true },
  );
  return passengerSaved;
};

const passengerRepository = {
  save,
  findOneByEmail,
  findOneAndUpdate,
};

export default passengerRepository;
