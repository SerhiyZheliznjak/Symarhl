import * as express from 'express';
import {OK} from 'http-status-codes';

import {getState} from '@monorepo/store';
import {startScheduler, stopScheduler} from '../../utils/nightShift';

const nigthShiftRouter = express.Router();

nigthShiftRouter.get('/', (_req: express.Request, res: express.Response) => {
  const {nightShift} = getState();
  res.send(nightShift);
});

nigthShiftRouter.put('/', (req: express.Request, res: express.Response) => {
  const {room, temp} = req.body;
  startScheduler(room, temp);
  res.send(OK);
});

nigthShiftRouter.delete('/', (req: express.Request, res: express.Response) => {
  const {room} = req.body;
  stopScheduler(room);
  res.send(OK);
});

export {nigthShiftRouter};
