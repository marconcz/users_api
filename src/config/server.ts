import app from '@src/config/app';
import env from '@src/config/env';
import logger from '@src/config/logger';

/**
 * @description Tells the app to start listening
 */
const listen = () => {
  const { host, port } = env;
  app.listen(port, host, () => {
    logger.info(`Server started on address [${host}] and port [${port}]`);
  });
};

// Server interface
const server = {
  listen,
};

export default server;
