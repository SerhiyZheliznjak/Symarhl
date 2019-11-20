import {NETWORK_PROD} from '@monorepo/core';

export const environment = {
  production: true,
  port: NETWORK_PROD.API_PORT,
  mqttBroker: NETWORK_PROD.MQTT_ADDRESS
};
