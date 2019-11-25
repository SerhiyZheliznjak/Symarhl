import {Room} from './Rooms';

export type PowerValue = '-1' | '0' | '1';

export interface RoomTemp {
  studio: number;
  bathroom: number;
  kidsroom: number;
  bedroom: number;
  outdoor: number;
}

export interface Variables {
  studio: number;
  bathroom: number;
  kidsroom: number;
  bedroom: number;
  interval: number;
  hysteresis: number;
}

export interface Power {
  pump: PowerValue;
  wall: PowerValue;
  studio: PowerValue;
  bathroom: PowerValue;
  kidsroom: PowerValue;
  bedroom: PowerValue;
}

export interface HomeState {
  temp: RoomTemp;
  variables: Variables;
  power: Power;
  nightShift: {
    at: Map<Room, number>;
    morning: number;
    evening: number;
  };
}

export const NO_READINGS = -127;
