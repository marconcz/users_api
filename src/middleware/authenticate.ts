/* eslint-disable camelcase */
import { Request, NextFunction, Response } from 'express';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

const authenticate = (request: Request, response: Response, next: NextFunction) => {
  const TOKEN_TYPE = 'Bearer';
  const authorization = request.header('authorization');

  if (!authorization) {
    response.status(400).send({ error: 'Missing header Authorization field' });
  } else {
    const [tokenType, token] = authorization.split(' ');
    if (tokenType === TOKEN_TYPE && token) {
      (async () => {
        try {
          const payload: DecodedIdToken = await getAuth().verifyIdToken(token);
          // const payload = { user_id: '634308b891cbee9f54c31663', rol: 'admin' };
          const { user_id, rol } = payload;
          request.body = { credential: { id: user_id, rol }, ...request.body };
          next();
        } catch (error) {
          response.status(401).send(error);
        }
      })();
    } else {
      response.status(400).send({ error: 'Invalid format in Authorization field' });
    }
  }
};

export default authenticate;
