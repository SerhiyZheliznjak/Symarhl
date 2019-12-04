import {Router, Response, Request} from 'express';
import {exec} from 'child_process';
import * as debugLogger from 'debug';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {getState} from '@monorepo/store';

const debug = debugLogger('heating-service:system');

const systemRouter = Router();

systemRouter.get('/cputemp', (_req: Request, res: Response) => {
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

systemRouter.get('/state', (_req: Request, res: Response) => {
  res.send(getState());
});

export {systemRouter};
