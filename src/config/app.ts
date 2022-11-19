import express, { Express } from 'express';
import router from '@src/router';

// App configuration
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App router configuration
app.use('/api/v1/users', router);

export default app;
