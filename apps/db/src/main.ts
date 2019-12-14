import {environment} from './environments/environment';
import app from './app';

const {port} = environment;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
