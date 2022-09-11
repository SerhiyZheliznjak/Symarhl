import {Router, Request, Response} from 'express';
import {OK} from 'http-status-codes';

import {setAwayMode} from '../../utils/scheduleService';

const scheduleRouter = Router();

scheduleRouter.put('/away', (req: Request, res: Response) => {
  const {until} = req.body;
  setAwayMode(until);
  res.send(OK);
});

scheduleRouter.delete('/away', (_: Request, res: Response) => {
  setAwayMode(null);
  res.send(OK);
});

export {scheduleRouter};
