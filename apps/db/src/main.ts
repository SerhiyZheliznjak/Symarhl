import * as express from 'express';
import {environment} from './environments/environment';

const app = express();

app.get('/api', (_req, res) => {
  res.send({message: 'Welcome to db!'});
});

const {port} = environment;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
