import { Request, Response } from 'express';
import passengerService from '@src/service/passenger';
import { UserForbiddenError, UserNotFoundError, UserUnauthorizedError } from '@src/exception/user';
//import { string } from 'zod';

const register = async (request: Request, response: Response) => {
  try {
    const customToken = await passengerService.register(request.body);
    response.status(200).send(customToken);
  } catch (error) {
    response.status(500).send(error);
  }
};

const validate = async (request: Request, response: Response) => {
  try {
    const customToken = await passengerService.validate(request.body);
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
}
const login = async (request: Request, response: Response) => {
  try {
    const customToken = await passengerService.login(request.body);
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
    const passengerResponse = await passengerService.update(request.body);
    response.status(200).send(passengerResponse);
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
    const passengerBody = request.body;
    const { id } = request.params;
    const passengerParams = { id };
    const passengerResponse = await passengerService.block(passengerBody, passengerParams);
    response.status(200).send(passengerResponse);
  } catch (error) {
    if (error instanceof UserUnauthorizedError) {
      response.status(401).send({ error: error.message });
    } else {
      response.status(500).send(error);
    }
  }
};

const passengerController = {
  validate,
  register,
  login,
  update,
  block,
};

export default passengerController;
