import { Request, Response } from 'express';
import driverService from '@src/service/driver';
import { UserForbiddenError, UserNotFoundError, UserUnauthorizedError } from '@src/exception/user';

const register = async (request: Request, response: Response) => {
  try {
    const customToken = await driverService.register(request.body);
    response.status(200).send(customToken);
  } catch (error) {
    response.status(500).send(error);
  }
};

const login = async (request: Request, response: Response) => {
  try {
    const customToken = await driverService.login(request.body);
    response.status(200).send(customToken);
  } catch (error) {
    if (error instanceof UserUnauthorizedError) {
      response.status(401).send({ error: error.message });
    } else if (error instanceof UserForbiddenError) {
      response.status(403).send({ error: error.message });
    } else {
      response.status(500).send(error);
    }
  }
};

const update = async (request: Request, response: Response) => {
  try {
    const driverResponse = await driverService.update(request.body);
    response.status(200).send(driverResponse);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      response.status(400).send({ error: error.message });
    } else if (error instanceof UserForbiddenError) {
      response.status(403).send({ error: error.message });
    } else {
      response.status(500).send(error);
    }
  }
};

const block = async (request: Request, response: Response) => {
  try {
    const driverBody = request.body;
    const { id } = request.params;
    const driverParams = { id };
    const driverResponse = await driverService.block(driverBody, driverParams);
    response.status(200).send(driverResponse);
  } catch (error) {
    if (error instanceof UserForbiddenError) {
      response.status(403).send({ error: error.message });
    } else {
      response.status(500).send(error);
    }
  }
};

const driverController = {
  register,
  login,
  update,
  block,
};

export default driverController;
