/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as express from 'express';
import {environment} from './environments/environment.prod';
import {join} from 'path';

const {port} = environment;

const app = express();

const clientDir = express.static(join(__dirname, '../symarhl'), {
  maxAge: 1000 * 60 * 60 * 24,
});
app.use(clientDir);
app.use('/*', clientDir);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
