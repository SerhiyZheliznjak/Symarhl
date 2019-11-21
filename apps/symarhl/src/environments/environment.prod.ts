import {NETWORK_PROD} from '@monorepo/core';

export const environment = {
  production: true,
  publicUrl: `http://192.168.31.129: ${NETWORK_PROD.WEB_PORT}`,
};
