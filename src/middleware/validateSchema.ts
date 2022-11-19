import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

const validate = (schema: ZodEffects<AnyZodObject> | AnyZodObject) => (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const result = schema.parse({
      body: request.body,
      params: request.params,
    });
    request.body = result.body;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).send(error.issues);
    } else {
      response.status(500).send({ error: 'Internal server error' });
    }
  }
};

export default validate;
