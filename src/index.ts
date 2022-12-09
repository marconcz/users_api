import server from '@src/config/server';
import database from '@src/config/database';
import firebase from '@src/config/firebase';
// Constants

/**
 * @description Runs the application.
 */
const run = () => {
  database.connect();
  firebase.initialize();
  server.listen();
};

run();
