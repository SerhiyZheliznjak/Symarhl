import * as cors from 'cors';
import * as debugLogger from 'debug';
import {WEB_DEV_ADDRESS} from '@monorepo/core';

const debug = debugLogger('heating-service:cors');
const whiteList = [WEB_DEV_ADDRESS];

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
