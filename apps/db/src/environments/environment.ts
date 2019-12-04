import {NETWORK_DEV} from '@monorepo/core';

export const environment = {
  production: false,
  port: NETWORK_DEV.DB_PORT,
  influx: `http://${NETWORK_DEV.MS_ADDRESS}:${NETWORK_DEV.INFLUX_PORT}`,
};
