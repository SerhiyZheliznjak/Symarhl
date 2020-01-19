import {TempLocation, RoomTemp} from './TempLocations';

export type PowerValue = '-1' | '0' | '1';

export type TempReadings = {
  [K in TempLocation]: number;
};

export type RoomNames = 'studio' | 'bathroom' | 'kidsroom' | 'bedroom';

export type VariablesKeys = RoomNames | 'interval' | 'hysteresis';

export type Variables = {
  [K in VariablesKeys]: number;
};

export interface Schedule {
  temp: number;
  frame: [number, number];
}

type PowerKeys = 'pump' | 'wall' | RoomNames;
export type Power = {
  [K in PowerKeys]: PowerValue;
};

export interface HomeState {
  temp: TempReadings;
  variables: Variables;
  power: Power;
  nightShift: {
    at: Map<RoomTemp, number>;
    morning: number;
    evening: number;
  };
  schedule: {[key in RoomNames]?: Schedule[]};
}

export const NO_READINGS = -127;
