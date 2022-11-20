import express from 'express';
import passengerController from '@src/controller/passenger';
import validateSchema from '@src/middleware/validateSchema';
import PassengerSchema from '@src/schema/Passenger';
import authenticate from '@src/middleware/authenticate';

const passengerRouter = express.Router();

passengerRouter.post('/passenger/email', validateSchema(PassengerSchema.CheckSchema), passengerController.validate);
passengerRouter.post('/passengers', validateSchema(PassengerSchema.RegisterSchema), passengerController.register);
passengerRouter.post('/passengers/login', validateSchema(PassengerSchema.LoginSchema), passengerController.login);
passengerRouter.put('/passengers', authenticate, validateSchema(PassengerSchema.UpdateSchema), passengerController.update);
passengerRouter.put('/passengers/:id/block', authenticate, validateSchema(PassengerSchema.BlockSchema), passengerController.block);

export default passengerRouter;
