import {environment} from './environments/environment';
import app from './app';
import influx from './influx';
import {DB_NAME} from './constants';

influx
  .getDatabaseNames()
  .then(names => {
    if (!names.includes(DB_NAME)) {
      return influx.createDatabase(DB_NAME);
    }
  })
  .then(() => {
    const {port} = environment;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  })
  .catch(() => {
    console.error(`Error creating Influx database!`);
  });
