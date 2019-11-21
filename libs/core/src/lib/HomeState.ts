export type PowerValue = '-1' | '0' | '1';

export interface RoomTemp {
  studio: number;
  bathroom: number;
  kidsroom: number;
  bedroom: number;
}

export interface Variables extends RoomTemp {
  interval: number;
  hysteresis: number;
  nightShift: number;
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
}

export const NO_READINGS = -127;
