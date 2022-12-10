import * as express from 'express';
import {join} from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';

import {
  systemRouter,
  temperatureRouter,
  variablesRouter,
  scheduleRouter,
} from './routes';
import {readVariablesFromFile} from '@monorepo/store';
import {setAwayMode} from '../utils/scheduleService';

// import {corsMiddleware} from './cors';

const app = express();

// app.use(corsMiddleware);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(__dirname, 'public')));

app.use('/temp', temperatureRouter);
app.use('/system', systemRouter);
app.use('/variables', variablesRouter);
app.use('/schedule', scheduleRouter);

const restoreState = () =>
  readVariablesFromFile().then(({away}) => {
    if (away) {
      setAwayMode(away.until, true);
    }
  });
// instead there should be some kind of run on arduino is ready or smth
setTimeout(restoreState, 60 * 2 * 1000);

export {app};
