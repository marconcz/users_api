import { Request, Response } from 'express';
import adminService from '@src/service/admin';
import { UserForbiddenError, UserUnauthorizedError } from '@src/exception/user';

const register = async (request: Request, response: Response) => {
  try {
    const adminFiltered = await adminService.register(request.body);
    response.status(200).send(adminFiltered);
  } catch (error) {
    if (error instanceof UserForbiddenError) {
      response.status(403).send({ error: error.message });
    } else {
      response.status(500).send(error);
    }
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const customToken = await adminService.login(request.body);
    response.status(200).send(customToken);
  } catch (error) {
    if (error instanceof UserUnauthorizedError) {
      response.status(401).send({ error: error.message });
    } else {
      console.log('caca');
      response.status(500).send(error);
    }
  }
};

const adminController = {
  register,
  login,
};

export default adminController;
