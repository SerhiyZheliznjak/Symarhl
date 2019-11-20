import {NETWORK_DEV} from '@monorepo/core';

export const environment = {
  production: false,
  port: NETWORK_DEV.API_PORT,
  mqttBroker: NETWORK_DEV.MQTT_ADDRESS
};
