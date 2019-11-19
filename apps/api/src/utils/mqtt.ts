import {connect} from 'async-mqtt';
import {mqttBroker} from '../constants/environment';

import {
  RequestSetTopic,
  Topic,
  RequestGetTopic,
  ReadTopic,
} from '../constants/topics';
import {handleMessage} from './messageHandler';
import {getState} from './store';
import {HomeState} from '@symarhl/core';

const client = connect(`tcp://${mqttBroker}`);

client.on('connect', () => {
  setTimeout(
    () => sendMessage(RequestGetTopic.variables, String(Date.now())),
    1000
  );
});

client.on('message', (topic: ReadTopic, bytes: unknown) =>
  handleMessage(topic, String(bytes))
);

export async function sendMessage(topic: Topic, payload: string) {
  return await client.publish(topic, payload, {qos: 1});
}

export function run() {
  client.subscribe('#');
}

export async function setVariableValue(
  topic: RequestSetTopic,
  payload: string,
  attempts = 5
) {
  await sendMessage(topic, payload);
  setTimeout(verifyConfirmation, 1000);
  const varName = topic.split('/')[1] as keyof HomeState['variables'];

  function verifyConfirmation() {
    const {variables} = getState();
    if (variables[varName] !== parseFloat(payload) && attempts > 0)
      setVariableValue(topic, payload, --attempts);
  }
}
