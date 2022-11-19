import express from 'express';
import adminController from '@src/controller/admin';
import validateSchema from '@src/middleware/validateSchema';
import AdminSchema from '@src/schema/Admin';
import authenticate from '@src/middleware/authenticate';

const adminRouter = express.Router();

adminRouter.post('/admins', authenticate, validateSchema(AdminSchema.RegisterSchema), adminController.register);
adminRouter.post('/admins/login', validateSchema(AdminSchema.LoginSchema), adminController.login);

export default adminRouter;
