import * as cors from 'cors';
import * as debugLogger from 'debug';

import * as configJson from '../config.json';

const debug = debugLogger('heating-service:cors');
const whiteList = configJson.corsWhiteList
  .split(' ')
  .filter((address: string) => !!address);

debug(`enabled for: [${whiteList}]`);

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
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
