import {NETWORK_DEV} from '@monorepo/core';
import {username, password} from '../../config.json';

export const environment = {
  production: false,
  port: NETWORK_DEV.DB_PORT,
  influxHost: NETWORK_DEV.MS_ADDRESS,
  influxPort: NETWORK_DEV.DB_PORT,
  influxUser: username,
  influxPassword: password,
};
