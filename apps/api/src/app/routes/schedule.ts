import {Router, Request, Response} from 'express';
import {OK} from 'http-status-codes';

import {getState} from '@monorepo/store';
import {setAwayMode} from '../../utils/scheduleService';

const scheduleRouter = Router();

scheduleRouter.get('/', (_req: Request, res: Response) => {
  const {schedule} = getState();
  res.send(schedule);
});

scheduleRouter.put('/away', (req: Request, res: Response) => {
  const {from, to} = req.body;
  setAwayMode(from, to);
  res.send(OK);
});

export {scheduleRouter};
