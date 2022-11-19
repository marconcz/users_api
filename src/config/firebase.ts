import { initializeApp } from 'firebase-admin/app';
import logger from '@src/config/logger';

const initialize = () => {
  try {
    initializeApp();
    logger.info('Firebase app initialized successfully');
  } catch (error) {
    logger.error(`Firebase app could not be initialized - ${error}`);
  }
};

// Database interface
const firebase = {
  initialize,
};

// https://firebase.google.com/docs/auth/admin/create-custom-tokens?authuser=0#using_a_service_account_json_file
export default firebase;
