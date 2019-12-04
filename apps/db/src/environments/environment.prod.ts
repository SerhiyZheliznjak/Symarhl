import {NETWORK_PROD} from '@monorepo/core';

export const environment = {
  production: true,
  port: NETWORK_PROD.DB_PORT,
  influx: `http://${NETWORK_PROD.MS_ADDRESS}:${NETWORK_PROD.INFLUX_PORT}`,
};
