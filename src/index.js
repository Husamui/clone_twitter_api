/* eslint-disable no-console */
import express from 'express';
import { createServer } from 'http';
import middlewares from './config/middlewares';

import './config/db';

const app = express();


middlewares(app);

const graphqlServer = createServer(app);

graphqlServer.listen(9000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen on port: 9000`);
  }
});