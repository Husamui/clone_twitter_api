/* eslint-disable no-console */
import express from 'express';
import { createServer } from 'http';
import middlewares from './config/middlewares';

import './config/db';
import constants from './config/constants'

const app = express();
middlewares(app);

const graphqlServer = createServer(app);

graphqlServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen on port: ${constants.PORT}`);
  }
});