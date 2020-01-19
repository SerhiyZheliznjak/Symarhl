import {RoomTemp, TempLocation} from '@monorepo/core';
import {HomeState, NO_READINGS, PowerValue} from '@monorepo/core';

const homeState: HomeState = {
  temp: {
    studio: NO_READINGS,
    bathroom: NO_READINGS,
    bedroom: NO_READINGS,
    kidsroom: NO_READINGS,
    outdoor: NO_READINGS,
    water: NO_READINGS,
  },
  variables: {
    studio: NO_READINGS,
    bathroom: NO_READINGS,
    kidsroom: NO_READINGS,
    bedroom: NO_READINGS,
    interval: NO_READINGS,
    hysteresis: NO_READINGS,
  },
  power: {
    pump: '-1',
    wall: '-1',
    studio: '-1',
    bathroom: '-1',
    kidsroom: '-1',
    bedroom: '-1',
  },
  nightShift: {
    at: new Map(),
    morning: 7,
    evening: 21,
  },
  schedule: {},
};

const validateVariableName = (variableName: string) => {
  if (variableName.indexOf('/') > -1)
    throw new Error(`${variableName} is invalid`);
};

export function setVariable(
  variable: keyof HomeState['variables'],
  val: number,
) {
  validateVariableName(variable);
  homeState.variables[variable] = val;
}

export function logPower(power: keyof HomeState['power'], state: PowerValue) {
  homeState.power[power] = state;
}

export function logTemp(room: TempLocation, temp: number) {
  homeState.temp[room] = temp;
}

export function getState() {
  return {...homeState};
}

export function logDayNightSchedule(morning = 7, evening = 21) {
  homeState.nightShift = {...homeState.nightShift, morning, evening};
}

export function logNightTemp(room: RoomTemp, nightTemp: number) {
  homeState.nightShift.at.set(room, nightTemp);
}

export function delNightTemp(room: RoomTemp): number {
  const {nightShift} = homeState;
  nightShift.at.delete(room);
  return nightShift.at.size;
}
