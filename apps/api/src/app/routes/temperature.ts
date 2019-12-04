import {Router, Request, Response} from 'express';
import {BAD_REQUEST, OK} from 'http-status-codes';

import {RoomTemp, RequestSetTopic} from '@monorepo/core';
import {mqttService} from '@monorepo/mqtt';
import {getState} from '@monorepo/store';

const temperatureRouter = Router();

temperatureRouter.get('/', (_req: Request, res: Response) => {
  const {temp} = getState();
  res.send(temp);
});

temperatureRouter.put('/', async (req: Request, res: Response) => {
  const {room, temp} = req.body;

  switch (room) {
    case RoomTemp.studio:
      await mqttService.setVariableValue(RequestSetTopic.studio, temp);
      res.send(OK);
      break;
    case RoomTemp.bathroom:
      await mqttService.setVariableValue(RequestSetTopic.bathroom, temp);
      res.send(OK);
      break;
    case RoomTemp.kidsroom:
      await mqttService.setVariableValue(RequestSetTopic.kidsroom, temp);
      res.send(OK);
      break;
    case RoomTemp.bedroom:
      await mqttService.setVariableValue(RequestSetTopic.bedroom, temp);
      res.send(OK);
      break;
    default:
      res.status(BAD_REQUEST);
  }
});

export {temperatureRouter};
