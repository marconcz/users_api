import bcrypt from 'bcrypt';
import { getAuth } from 'firebase-admin/auth';
import adminRepository from '@src/repository/admin';
import Rol from '@src/model/Rol';
import { UserForbiddenError, UserUnauthorizedError } from '@src/exception/user';
import { LoginType, RegisterType } from '@src/schema/Admin';

const register = async (admin: RegisterType) => {
  const { credential, passwordConfirmation, ...adminDB } = admin;

  if (credential.rol !== Rol.ADMIN) {
    throw new UserForbiddenError('Not enough privileges to create a new admin');
  }

  const salt = await bcrypt.genSalt(10);
  adminDB.password = await bcrypt.hash(passwordConfirmation, salt);
  const adminSaved = await adminRepository.save({ ...adminDB });

  const adminFiltered = {
    email: adminSaved.email,
  };
  return adminFiltered;
};

const login = async (admin: LoginType) => {
  const adminFound = await adminRepository.findOneByEmail(admin.email);

  if (!adminFound) {
    throw new UserUnauthorizedError('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(admin.password, adminFound.password);
  if (!validPassword) {
    throw new UserUnauthorizedError('Invalid email or password');
  }

  const uid = adminFound._id.toString();
  const claims = {
    firstname: adminFound.firstname,
    lastname: adminFound.lastname,
    email: adminFound.email,
    rol: Rol.ADMIN,
  };
  const customToken = await getAuth().createCustomToken(uid, claims);
  return customToken;
};

const adminService = {
  register,
  login,
};

export default adminService;
