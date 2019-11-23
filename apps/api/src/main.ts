import {createServer} from 'http';
import * as debugLogger from 'debug';
import {mqttService} from '@monorepo/mqtt';

import {handleMessage} from './utils/messageHandler';
import {environment} from './environments/environment';
import {app} from './app';

const debug = debugLogger('heating-service:server');

const {port} = environment;

app.set('port', port);

const server = createServer(app);

server.listen(port);

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
  mqttService.connect(environment.mqttBroker, handleMessage);
});
