import * as express from 'express';
import {querryVariables} from '../influx';

const app = express();

app.get('/', function(req, res) {
  querryVariables()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

export default app;
