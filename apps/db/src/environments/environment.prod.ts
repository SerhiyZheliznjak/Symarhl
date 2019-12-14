import {NETWORK_PROD} from '@monorepo/core';
import {username, password} from '../../config.json';

export const environment = {
  production: true,
  port: NETWORK_PROD.DB_PORT,
  influxHost: `http://${NETWORK_PROD.MS_ADDRESS}`,
  influxPort: NETWORK_PROD.DB_PORT,
  influxUser: username,
  influxPassword: password,
};
