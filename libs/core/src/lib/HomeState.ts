import {TempLocation, RoomTemp} from './TempLocations';

export type PowerValue = '-1' | '0' | '1';

export type TempReadings = {
  [K in TempLocation]: number;
};

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
  temp: TempReadings;
  variables: Variables;
  power: Power;
  nightShift: {
    at: Map<RoomTemp, number>;
    morning: number;
    evening: number;
  };
}

export const NO_READINGS = -127;
