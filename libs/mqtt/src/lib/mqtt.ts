import {connect, AsyncMqttClient} from 'async-mqtt';

import {
  RequestSetTopic,
  Topic,
  RequestGetTopic,
  ReadTopic,
  Variables,
  HomeState
} from '@monorepo/core';

export class MqttService {
  private client: AsyncMqttClient;

  constructor(
    brokerAddress: string,
    messageHandler: (topic: Topic, payload: string) => unknown
  ) {
    this.client = connect(`tcp://${brokerAddress}`);
    this.client.on('connect', () => {
      setTimeout(
        () => this.sendMessage(RequestGetTopic.variables, String(Date.now())),
        1000
      );
    });
    this.client.subscribe('#');
    this.client.on('message', (topic: ReadTopic, bytes: unknown) =>
      messageHandler(topic, String(bytes))
    );
  }

  async sendMessage(topic: Topic, payload: string) {
    return await this.client.publish(topic, payload, {qos: 1});
  }

  async setVariableValue(
    topic: RequestSetTopic,
    payload: string,
    getState: () => HomeState,
    attempts = 5
  ) {
    await this.sendMessage(topic, payload);
    setTimeout(verifyConfirmation, 1000);
    const varName = topic.split('/')[1] as keyof Variables;

    function verifyConfirmation() {
      const {variables} = getState();
      if (variables[varName] !== parseFloat(payload) && attempts > 0)
        this.setVariableValue(topic, payload, --attempts);
    }
  }
}
