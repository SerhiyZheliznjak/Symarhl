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
import {
  logTemp,
  logPower,
  setVariable,
  readVariablesFromFile,
  getState,
} from '@monorepo/store';
import {mqttService, parsePayload} from '@monorepo/mqtt';
const rooms = [
  RoomTemp.studio,
  RoomTemp.bathroom,
  RoomTemp.bedroom,
  RoomTemp.kidsroom,
];

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
      verifyVariables(payload);
      break;
    case RequestSetTopic.confirmed:
      const [key, val] = payload.split('=') as [
        keyof HomeState['variables'],
        string,
      ];
      setVariable(key, parseFloat(val));
      break;
    case ReadTopic.started:
      void setAllVariables();
      break;
  }
};

const verifyVariables = (payload: string) => {
  const {variables} = getState();

  const hasDifference = parsePayload(payload).find(
    ([topic, value]: [keyof Variables, string]) => {
      if (rooms.includes(topic as RoomTemp))
        return (
          variables[topic] !== NO_READINGS &&
          parseFloat(value) !== NO_READINGS &&
          variables[topic] !== parseFloat(value)
        );
      return false;
    },
  );
  if (hasDifference) {
    setAllVariables();
  }
};

async function setAllVariables() {
  const {variables, away} = await readVariablesFromFile();

  const values = away ? away.restoreTo : variables;

  Object.keys(values).forEach((variable: keyof Variables, i: number) => {
    if (variable) {
      const value = values[variable];
      setVariable(variable, value);
      if (value !== NO_READINGS)
        setTimeout(
          () =>
            mqttService.setVariableValue(
              `set/${variable}` as RequestSetTopic,
              String(value),
            ),
          i * 300,
        );
    }
  });
}
