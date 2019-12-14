import * as express from 'express';

const app = express();

app.get('/api', (_req, res) => {
  res.send({message: 'Welcome to db!'});
});

export default app;
