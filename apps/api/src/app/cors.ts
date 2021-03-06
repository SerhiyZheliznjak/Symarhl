import * as cors from 'cors';
import * as debugLogger from 'debug';
import {NETWORK_DEV, NETWORK_PROD} from '@monorepo/core';

const debug = debugLogger('heating-service:cors');
const ports = [NETWORK_DEV.WEB_PORT, NETWORK_PROD.WEB_PORT];
const hosts = ['localhost', '192.168.31.247'];
const whiteList = ports.reduce(
  (acc, port) => [...hosts.map(host => `http://${host}:${port}`), ...acc],
  [],
);

debug(`enabled for: [${whiteList}]`);

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    debug(`request from origin: ${origin}`);
    if (!origin || whiteList.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      debug(`unknown origin ${origin}`);
      callback(new Error(`CORS IS NOT ALLOWED for ${origin}`));
    }
  },
};

export const corsMiddleware = cors(corsOptions);
