import bcrypt from 'bcrypt';
//import { getAuth } from 'firebase-admin/auth';
import passengerRepository from '@src/repository/passenger';
import Rol from '@src/model/Rol';
import {
  BlockBodyType, BlockParamsType, CheckType, LoginType, RegisterType, UpdateType,
} from '@src/schema/Passenger';
import { UserForbiddenError, UserNotFoundError, UserUnauthorizedError } from '@src/exception/user';

const register = async (passenger: RegisterType) => {
  const { passwordConfirmation, ...passengerDB } = passenger;
  const salt = await bcrypt.genSalt(10);
  passengerDB.password = await bcrypt.hash(passwordConfirmation, salt);
  const passengerSaved = await passengerRepository.save({ ...passengerDB });

  //const uid = passengerSaved._id.toString();
  //const claims = {
  //  email: passengerSaved.email,
  //  rol: Rol.PASSENGER,
  //};
  //const customToken = await getAuth().createCustomToken(uid, claims);
  return passengerSaved;
};

const validate = async (passenger: CheckType) => {

  const passengerFound = await passengerRepository.findOneByEmail(passenger.email);

  if (!passengerFound) {
    return {passenger : false};
  }
  else{
    return {passenger : true};
  }

 // return passengerFiltered;
}
const login = async (passenger: LoginType) => {
  const passengerFound = await passengerRepository.findOneByEmail(passenger.email);
  return passengerFound;
  // if (!passengerFound) {
  //   throw new UserUnauthorizedError('Invalid email or password');
  // }

  // const validPassword = await bcrypt.compare(passenger.password, passengerFound.password);
  // if (!validPassword) {
  //   throw new UserUnauthorizedError('Invalid email or password');
  // }

  // if (!passengerFound.isVerified) {
  //   throw new UserForbiddenError('Passenger not verified, please verify it and try again');
  // }

  // if (passengerFound.isBlocked) {
  //   throw new UserForbiddenError('Passenger blocked, please contact us for more information');
  // }

  // const uid = passengerFound._id.toString();
  // const claims = {
  //   firstname: passengerFound.firstname,
  //   lastname: passengerFound.lastname,
  //   email: passengerFound.email,
  //   rol: Rol.PASSENGER,
  // };
  // const customToken = await getAuth().createCustomToken(uid, claims);
  // return customToken;
};

const update = async (passenger: UpdateType) => {
  const { ...passengerDB } = passenger;

  if (passenger.rol !== Rol.PASSENGER) {
    throw new UserForbiddenError('Not enough privileges to update a passenger');
  }

  const passengerUpdated = await passengerRepository.findOneAndUpdate(passenger.id, passengerDB);

  if (!passengerUpdated) {
    throw new UserNotFoundError('User not found');
  }

  const passengerFiltered = {
    name: passengerUpdated.name,
    lastname: passengerUpdated.lastname,
    birthday: passengerUpdated.birthday,
    age: passengerUpdated.age,
    address: passengerUpdated.address,
  };
  return passengerFiltered;
};

const block = async (passengerBody: BlockBodyType, passengerParams: BlockParamsType) => {
  const { credential, ...passengerDB } = passengerBody;
  const { id } = passengerParams;

  if (credential.rol !== Rol.ADMIN) {
    throw new UserUnauthorizedError('Not enough privileges to block a passenger');
  }

  const passengerUpdated = await passengerRepository.findOneAndUpdate(id, passengerDB);
  if (!passengerUpdated) {
    throw new UserNotFoundError('User not found');
  }

  const passengerFiltered = {
    name: passengerUpdated.name,
    lastname: passengerUpdated.lastname,
    birthday: passengerUpdated.birthday,
    age: passengerUpdated.age,
    address: passengerUpdated.address,
  };
  return passengerFiltered;
};

const data = async (passenger: CheckType) => {

  const passengerFound = await passengerRepository.findOneByEmail(passenger.email);

  if (!passengerFound) {
    return {};
  }
  else{
    return passengerFound;
  }

 // return passengerFiltered;
}

const passengerService = {
  validate,
  register,
  login,
  update,
  block,
  data,
};

export default passengerService;
