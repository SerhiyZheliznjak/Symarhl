import {ReadTopic, RequestSetTopic, Topic} from '../constants/topics';
import {setTemp, setPower, setVariables} from './store';
import {Room} from '../constants/Rooms';
import {HomeState, PowerState} from '@symarhl/core';

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
      parsePayload(
        payload
      ).forEach(([key, value]: [keyof HomeState['power'], PowerState]) =>
        setPower(key, value)
      );
      break;
    case ReadTopic.variables:
      parsePayload(
        payload
      ).forEach(([key, value]: [keyof HomeState['variables'], string]) =>
        setVariables(key, parseFloat(value))
      );
      break;
    case RequestSetTopic.confirmed:
      const [key, val] = payload.split('/')[1].split('=') as [
        keyof HomeState['variables'],
        string
      ];
      setVariables(key, parseFloat(val));
      break;
  }
};

const parsePayload = (payload: string) =>
  payload.split(';').map(keyVal => keyVal.split('='));
