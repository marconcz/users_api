import mongoose from 'mongoose';
import env from '@src/config/env';
import logger from '@src/config/logger';

/**
 * @description Configures event listeners to the database.
 */
const _configureEventListeners = () => {
  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to the database');
  });

  mongoose.connection.on('disconnecting', () => {
    logger.info('Disconnecting from the database');
  });

  mongoose.connection.on('connected', () => {
    logger.info('The connection to the database was established');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('The database has been disconnected');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`An error on the connection has occurred - ${error}`);
  });
};

/**
 * @description Establishes the connection to the database. If an error
 * occurs no other tries to reconnect are attempt.
 */
const connect = () => {
  const { databaseURI } = env;

  _configureEventListeners();
  try {
    (async () => {
      await mongoose.connect(databaseURI);
    })();
    // await mongoose.connect(databaseURI);
  } catch (error) {
    logger.error(`Could not connect to the database - ${error}`);
  }
};

// Database interface
const database = {
  connect,
};

export default database;
