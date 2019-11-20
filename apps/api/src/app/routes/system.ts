import * as express from 'express';
import {exec} from 'child_process';
import * as debugLogger from 'debug';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {getState} from '@monorepo/store';

const debug = debugLogger('heating-service:system');

const systemRouter = express.Router();

systemRouter.get('/cputemp', (_req: express.Request, res: express.Response) => {
  exec('vcgencmd measure_temp', (err, stdout, stderr) => {
    if (err) {
      debug(err.message);
      res.status(INTERNAL_SERVER_ERROR).send(err.message);
      return;
    }

    debug(`stdout: ${stdout}; stderr: ${stderr}`);
    res.send(stdout);
  });
});

systemRouter.get('/state', (_req: express.Request, res: express.Response) => {
  res.send(getState());
});

export {systemRouter};
