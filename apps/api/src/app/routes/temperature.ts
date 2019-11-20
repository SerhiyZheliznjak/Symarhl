import * as express from 'express';
import {BAD_REQUEST, OK} from 'http-status-codes';

import {Room, RequestSetTopic} from '@monorepo/core';
import {mqttService} from '@monorepo/mqtt';
import {getState} from '@monorepo/store';

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
        await mqttService.setVariableValue(RequestSetTopic.studio, temp);
        res.send(OK);
        break;
      case Room.bathroom:
        await mqttService.setVariableValue(RequestSetTopic.bathroom, temp);
        res.send(OK);
        break;
      case Room.kidsroom:
        await mqttService.setVariableValue(RequestSetTopic.kidsroom, temp);
        res.send(OK);
        break;
      case Room.bedroom:
        await mqttService.setVariableValue(RequestSetTopic.bedroom, temp);
        res.send(OK);
        break;
      default:
        res.status(BAD_REQUEST);
    }
  },
);

export {temperatureRouter};
