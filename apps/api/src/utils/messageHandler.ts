import {
  ReadTopic,
  RequestSetTopic,
  Topic,
  Room,
  HomeState,
  PowerValue,
} from '@monorepo/core';
import {setTemp, setPower, setVariable} from '@monorepo/store';

const stripSet = (setTopic: RequestSetTopic | string) =>
  setTopic.split('set/')[1];

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
    case ReadTopic.power:
      parsePayload(payload).forEach(
        ([topic, value]: [keyof HomeState['power'], PowerValue]) =>
          setPower(topic, value),
      );
      break;
    case ReadTopic.variables:
      parsePayload(payload).forEach(
        ([topic, value]: [RequestSetTopic, string]) =>
          setVariable(stripSet(topic) as Room, parseFloat(value)),
      );
      break;
    case RequestSetTopic.confirmed:
      const [key, val] = stripSet(payload).split('=') as [
        keyof HomeState['variables'],
        string,
      ];
      setVariable(key, parseFloat(val));
      break;
  }
};
