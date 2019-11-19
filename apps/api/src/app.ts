import * as express from 'express';
import {join} from 'path';
import * as logger from 'morgan';

import {systemRouter, temperatureRouter} from './routes';
import {corsMiddleware} from './cors';
import {run} from './services/mqtt';
import {startScheduler} from './services/nightShift';
import {variablesRouter} from './routes/variables';

const app = express();

app.use(corsMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(join(__dirname, 'public')));

app.use('/temp', temperatureRouter);
app.use('/system', systemRouter);
app.use('/variables', variablesRouter);

startScheduler();

run();

export {app};
