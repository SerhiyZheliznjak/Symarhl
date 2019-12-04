import {
  ReadTopic,
  RequestSetTopic,
  Topic,
  RoomTemp,
  HomeState,
  PowerValue,
  Variables,
  NO_READINGS,
  UtilityTemp,
} from '@monorepo/core';
import {logTemp, logPower, setVariable, getState} from '@monorepo/store';
import {mqttService} from '@monorepo/mqtt';
import {setCurrentShift} from './nightShift';

const stripSet = (setTopic: RequestSetTopic | string) =>
  setTopic.split('set/')[1] as keyof Variables;

const parsePayload = (payload: string) =>
  payload.split(';').map(keyVal => keyVal.split('='));

export const handleMessage = (topic: Topic, payload: string) => {
  switch (topic) {
    case ReadTopic.studio:
      logTemp(RoomTemp.studio, parseFloat(payload));
      break;
    case ReadTopic.bathroom:
      logTemp(RoomTemp.bathroom, parseFloat(payload));
      break;
    case ReadTopic.kidsroom:
      logTemp(RoomTemp.kidsroom, parseFloat(payload));
      break;
    case ReadTopic.bedroom:
      logTemp(RoomTemp.bedroom, parseFloat(payload));
      break;
    case ReadTopic.outdoor:
      logTemp(UtilityTemp.outdoor, parseFloat(payload));
      break;
    case ReadTopic.water:
      logTemp(UtilityTemp.water, parseFloat(payload));
      break;
    case ReadTopic.power:
      parsePayload(payload).forEach(
        ([topic, value]: [keyof HomeState['power'], PowerValue]) =>
          logPower(topic, value),
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
    const value = variables[variable];
    if (value !== NO_READINGS)
      setTimeout(
        () =>
          mqttService.setVariableValue(
            `set/${variable}` as RequestSetTopic,
            String(value),
          ),
        i * 300,
      );
  });
}
