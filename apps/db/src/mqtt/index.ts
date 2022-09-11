import {ReadTopic, Topic, Variables} from '@monorepo/core';
import {parsePayload} from '@monorepo/mqtt';
import {setVariable, getState} from '@monorepo/store';
import {logVariables} from '../influx';

export const handleMessage = (topic: Topic, payload: string) => {
  switch (topic) {
    case ReadTopic.studio:
      // logTemp(RoomTemp.studio, parseFloat(payload));
      break;
    case ReadTopic.bathroom:
      // logTemp(RoomTemp.bathroom, parseFloat(payload));
      break;
    case ReadTopic.kidsroom:
      // logTemp(RoomTemp.kidsroom, parseFloat(payload));
      break;
    case ReadTopic.bedroom:
      // logTemp(RoomTemp.bedroom, parseFloat(payload));
      break;
    case ReadTopic.outdoor:
      // logOutdoorTemp(parseFloat(payload));
      break;
    case ReadTopic.power:
      //  parsePayload(payload).forEach(
      //     ([topic, value]: [keyof HomeState['power'], PowerValue]) =>
      //        logPower(topic, value),
      //   );
      break;
    case ReadTopic.variables:
      handleVariables(payload);
      break;
  }
};

function handleVariables(payload: string) {
  const {variables} = getState();

  const updatedVariables = parsePayload(payload).reduce(
    (acc: Partial<Variables>, [key, val]: [keyof Variables, string]) => {
      const value = parseFloat(val);
      setVariable(key, value);
      if (key && variables[key] !== value) {
        return {
          ...acc,
          [key]: value,
        };
      }
      return acc;
    },
    {},
  );

  if (Object.entries(updatedVariables).length) logVariables(updatedVariables);
}
