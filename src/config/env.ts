import dotenv from 'dotenv';
import logger from '@src/config/logger';

// Default values
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 3000;

// Set environment variables
dotenv.config();

/**
 * @description Validates a host.
 * @param {string} host Host value must be a string type.
 * @returns {string} Host cast to string or DEFAULT_HOST in case of error.
 */
const _getHost = (host?: string): string => {
  let _host = host;
  if (!_host) {
    _host = DEFAULT_HOST;
    logger.warn(`Invalid HOST value, default taken - ${_host}`);
  }
  return _host;
};

/**
 * @description Validates a port.
 * @param {string} port Port value must be a string type.
 * @returns {number} Port cast to number or DEFAULT_PORT in case of error.
 */
const _getPort = (port?: string): number => {
  const intBase = 10;
  let _port = port ? parseInt(port, intBase) : port as undefined;

  if (!port || !_port || _port.toString().length !== port.length) {
    _port = DEFAULT_PORT;
    logger.warn(`Invalid PORT value, default taken - ${_port}`);
  }
  return _port;
};

/**
 * @description Validates a database URI.
 * @param {string} databaseURI Database uri value must be a string type.
 * @returns {number} Port cast to number or DEFAULT_PORT in case of error.
 * @throws DatabaseException
 */
const _getDatabaseURI = (databaseURI?: string): string => {
  if (!databaseURI) {
    throw new Error(`Invalid database URI ${__filename}`);
  }
  return databaseURI;
};

// Enviroment variable values
const env = {
  host: _getHost(process.env.HOST),
  port: _getPort(process.env.PORT),
  databaseURI: _getDatabaseURI(process.env.DB_URI),
};

export default env;
