import {connect, AsyncMqttClient} from 'async-mqtt';

import {RequestSetTopic, Topic, Variables} from '@monorepo/core';

class MqttService {
  private client: AsyncMqttClient;
  private confirmations: Map<keyof Variables, number> = new Map();

  connect(
    brokerAddress: string,
    messageHandler: (topic: Topic, payload: string) => unknown,
  ) {
    this.client = connect(`tcp://${brokerAddress}`);
    this.client.on('message', (topic: Topic, bytes: unknown) => {
      const payload = String(bytes);
      if (topic === RequestSetTopic.confirmed) {
        const [key, val] = payload.split('/')[1].split('=') as [
          keyof Variables,
          string,
        ];
        this.confirmations.set(key, parseFloat(val));
      }
      messageHandler(topic, payload);
    });
    this.client.subscribe('#');
  }

  async sendMessage(topic: Topic, payload: string) {
    return await this.client.publish(topic, payload, {qos: 1});
  }

  async setVariableValue(
    topic: RequestSetTopic,
    payload: string,
    attempts = 5,
  ) {
    const varName = topic.split('/')[1] as keyof Variables;
    const verifyConfirmation = () => {
      if (
        this.confirmations.get(varName) !== parseFloat(payload) &&
        attempts > 0
      )
        this.setVariableValue(topic, payload, --attempts);
    };

    await this.sendMessage(topic, payload);
    setTimeout(verifyConfirmation, 1000);
  }
}

export const mqttService = new MqttService();
