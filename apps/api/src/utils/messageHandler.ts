import {
  ReadTopic,
  RequestSetTopic,
  Topic,
  Room,
  HomeState,
  PowerValue,
  Variables,
} from '@monorepo/core';
import {setTemp, setPower, setVariable, getState} from '@monorepo/store';
import {mqttService} from '@monorepo/mqtt';
import {setCurrentShift} from './nightShift';

const stripSet = (setTopic: RequestSetTopic | string) =>
  setTopic.split('set/')[1] as keyof Variables;

const parsePayload = (payload: string) =>
  payload.split(';').map(keyVal => keyVal.split('='));

export const handleMessage = (topic: Topic, payload: string) => {
  switch (topic) {
    case ReadTopic.studio:
      setTemp(Room.studio, parseFloat(payload));
      break;
    case ReadTopic.bathroom:
      setTemp(Room.bathroom, parseFloat(payload));
      break;
    case ReadTopic.kidsroom:
      setTemp(Room.kidsroom, parseFloat(payload));
      break;
    case ReadTopic.bedroom:
      setTemp(Room.bedroom, parseFloat(payload));
      break;
    case ReadTopic.outdoor:
      setTemp(Room.outdoor, parseFloat(payload));
      break;
    case ReadTopic.power:
      parsePayload(payload).forEach(
        ([topic, value]: [keyof HomeState['power'], PowerValue]) =>
          setPower(topic, value),
      );
      break;
    case ReadTopic.variables:
      parsePayload(payload).forEach(
        ([topic, value]: [RequestSetTopic, string]) =>
          setVariable(stripSet(topic), parseFloat(value)),
      );
      break;
    case RequestSetTopic.confirmed:
      const [key, val] = stripSet(payload).split('=') as [
        keyof HomeState['variables'],
        string,
      ];
      setVariable(key, parseFloat(val));
      break;
    case ReadTopic.started:
      setAllVariables();
      setCurrentShift();
      break;
  }
};

function setAllVariables() {
  const {variables} = getState();
  Object.keys(variables).forEach((variable: keyof Variables, i: number) => {
    setTimeout(
      () =>
        mqttService.setVariableValue(
          `set/${variable}` as RequestSetTopic,
          String(variables[variable]),
        ),
      i * 300,
    );
  });
}
