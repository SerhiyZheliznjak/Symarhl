import {Router, Request, Response} from 'express';
import {OK} from 'http-status-codes';

import {getState} from '@monorepo/store';
import {startScheduler, stopScheduler} from '../../utils/nightShift';

const nigthShiftRouter = Router();

nigthShiftRouter.get('/', (_req: Request, res: Response) => {
  const {nightShift} = getState();
  res.send(nightShift);
});

nigthShiftRouter.put('/', (req: Request, res: Response) => {
  const {room, temp} = req.body;
  startScheduler(room, temp);
  res.send(OK);
});

nigthShiftRouter.delete('/', (req: Request, res: Response) => {
  const {room} = req.body;
  stopScheduler(room);
  res.send(OK);
});

export {nigthShiftRouter};
