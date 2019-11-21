import * as cors from 'cors';
import * as debugLogger from 'debug';
import {NETWORK_DEV, NETWORK_PROD} from '@monorepo/core';

const debug = debugLogger('heating-service:cors');
const whiteList = [NETWORK_DEV.WEB_PORT, NETWORK_PROD.WEB_PORT].map(
  port => `http://localhost:${port}`,
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
      callback(new Error('CORS IS NOT ALLOWED'));
    }
  },
};

export const corsMiddleware = cors(corsOptions);
