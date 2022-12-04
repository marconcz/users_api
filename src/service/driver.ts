import bcrypt from 'bcrypt';
import { getAuth } from 'firebase-admin/auth';
import driverRepository from '@src/repository/driver';
import Rol from '@src/model/Rol';
import { UserForbiddenError, UserNotFoundError, UserUnauthorizedError } from '@src/exception/user';
import {
  BlockBodyType,
  BlockParamsType,
  LoginType, RegisterType, UpdateType,
} from '@src/schema/Driver';

const register = async (driver: RegisterType) => {
  const { passwordConfirmation, ...driverDB } = driver;
  const salt = await bcrypt.genSalt(10);
  driverDB.password = await bcrypt.hash(passwordConfirmation, salt);
  const driverSaved = await driverRepository.save({ ...driverDB });

  // const uid = driverSaved._id.toString();
  // const claims = {
  //   email: driverSaved.email,
  //   rol: Rol.DRIVER,
  // };
  // const customToken = await getAuth().createCustomToken(uid, claims);
  // return customToken;
  return driverSaved
};

const login = async (driver: LoginType) => {
  const driverFound = await driverRepository.findOneByEmail(driver.email);

  if (!driverFound) {
    throw new UserUnauthorizedError('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(driver.password, driverFound.password);
  if (!validPassword) {
    throw new UserUnauthorizedError('Invalid email or password');
  }

  if (!driverFound.isVerified) {
    throw new UserForbiddenError('Driver not verified, please verify it and try again');
  }

  if (driverFound.isBlocked) {
    throw new UserForbiddenError('Driver blocked, please contact us for more information');
  }

  const uid = driverFound._id.toString();
  const claims = {
    name: driverFound.name,
    lastname: driverFound.lastname,
    email: driverFound.email,
    rol: Rol.PASSENGER,
  };
  const customToken = await getAuth().createCustomToken(uid, claims);
  return customToken;
};

const update = async (driver: UpdateType) => {
  const { credential, ...driverDB } = driver;

  if (credential.rol !== Rol.DRIVER) {
    throw new UserForbiddenError('Not enough privileges to update a driver');
  }

  const driverUpdated = await driverRepository.findOneAndUpdate(credential.id, driverDB);

  if (!driverUpdated) {
    throw new UserNotFoundError('User not found');
  }

  const driverFiltered = {
    name: driverUpdated.name,
    lastname: driverUpdated.lastname,
    birthday: driverUpdated.birthday,
    age: driverUpdated.age,
    license: driverUpdated.license,
    vehicle: driverUpdated.vehicle,
  };
  return driverFiltered;
};

const block = async (driverBody: BlockBodyType, driverParams: BlockParamsType) => {
  const { credential, ...driverDB } = driverBody;
  const { id } = driverParams;

  if (credential.rol !== Rol.ADMIN) {
    throw new UserForbiddenError('Not enough privileges to block a driver');
  }

  const driverUpdated = await driverRepository.findOneAndUpdate(id, driverDB);
  if (!driverUpdated) {
    throw new UserNotFoundError('User not found');
  }

  const driverFiltered = {
    name: driverUpdated.name,
    lastname: driverUpdated.lastname,
    birthday: driverUpdated.birthday,
    age: driverUpdated.age,
    license: driverUpdated.license,
    vehicle: driverUpdated.vehicle,
  };
  return driverFiltered;
};

const driverService = {
  register,
  login,
  update,
  block,
};

export default driverService;
