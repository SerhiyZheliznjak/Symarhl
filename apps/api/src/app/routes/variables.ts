import * as express from 'express';
import {setVariableValue} from '../services/mqtt';
import {RequestSetTopic} from '../constants/topics';
import {OK, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {Variables} from '@symarhl/core';

const variablesRouter = express.Router();

variablesRouter.put(
  '/',
  async (req: express.Request, res: express.Response) => {
    const variables = req.body as Partial<Variables>;
    for (let [key, value] of Object.entries(variables)) {
      try {
        await setVariableValue(`set/${key}` as RequestSetTopic, String(value));
        res.send(OK);
      } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send(`FAILED TO SET ${key}=${value}`);
      }
    }
  }
);

export {variablesRouter};
