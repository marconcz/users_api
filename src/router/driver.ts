import express from 'express';
import driverController from '@src/controller/driver';
import validateSchema from '@src/middleware/validateSchema';
import DriverSchema from '@src/schema/Driver';
import authenticate from '@src/middleware/authenticate';

const driverRouter = express.Router();

driverRouter.post('/drivers', validateSchema(DriverSchema.RegisterSchema), driverController.register);
driverRouter.post('/drivers/login', validateSchema(DriverSchema.LoginSchema), driverController.login);
driverRouter.put('/drivers', authenticate, validateSchema(DriverSchema.UpdateSchema), driverController.update);
driverRouter.put('/drivers/:id/block', authenticate, validateSchema(DriverSchema.BlockSchema), driverController.block);

export default driverRouter;
