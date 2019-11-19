import * as express from 'express';
import {Room} from '../constants/Rooms';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {setVariableValue} from '../services/mqtt';
import {RequestSetTopic} from '../constants/topics';
import {getState} from '../services/store';

const temperatureRouter = express.Router();

temperatureRouter.get('/', (_req: express.Request, res: express.Response) => {
  const {temp} = getState();
  res.send(temp);
});

temperatureRouter.put(
  '/',
  async (req: express.Request, res: express.Response) => {
    const {room, temp} = req.body;

    switch (room) {
      case Room.studio:
        await setVariableValue(RequestSetTopic.studio, temp);
        res.send(OK);
        break;
      case Room.bathroom:
        await setVariableValue(RequestSetTopic.bathroom, temp);
        res.send(OK);
        break;
      case Room.kidsroom:
        await setVariableValue(RequestSetTopic.kidsroom, temp);
        res.send(OK);
        break;
      case Room.bedroom:
        await setVariableValue(RequestSetTopic.bedroom, temp);
        res.send(OK);
        break;
      default:
        res.status(BAD_REQUEST);
    }
  }
);

export {temperatureRouter};
