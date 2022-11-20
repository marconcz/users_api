import express from 'express';
import passengerRouter from '@src/router/passenger';
import driverRouter from '@src/router/driver';
import adminRouter from '@src/router/admin';

const router = express.Router();

router.use(passengerRouter);
router.use(driverRouter);
router.use(adminRouter);

export default router;
