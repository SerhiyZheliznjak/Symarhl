import {RoomTemp, StoredHomeState, TempLocation} from '@monorepo/core';
import {HomeState, NO_READINGS, PowerValue} from '@monorepo/core';
const {writeFile, readFile} = require('fs').promises;

const variablesFilePath = '/media/variables.json';
export const AWAY_TEMP = 17;

export const initialHomeState: HomeState = {
  temp: {
    studio: NO_READINGS,
    bathroom: NO_READINGS,
    bedroom: NO_READINGS,
    kidsroom: NO_READINGS,
    outdoor: NO_READINGS,
    water: NO_READINGS,
  },
  variables: {
    studio: AWAY_TEMP,
    bathroom: AWAY_TEMP,
    kidsroom: AWAY_TEMP,
    bedroom: AWAY_TEMP,
    interval: 20000,
    hysteresis: 0.3,
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
    at: null,
    morning: 7,
    evening: 21,
  },
  away: null,
};

let homeState = initialHomeState;

export const readVariablesFromFile = async () => {
  try {
    const res = await readFile(variablesFilePath);
    if (res) {
      const {variables, away} = JSON.parse(res) as StoredHomeState;
      homeState.variables = variables;
      homeState.away = away;
    }
  } catch (err) {
    console.error(`Could not read from ${variablesFilePath}`);
  }
  return homeState;
};

const saveVariables = () => {
  const {variables, away} = homeState;
  writeFile(variablesFilePath, JSON.stringify({variables, away}));
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
  saveVariables();
}

export function setAwayUntil(awayUntil: string) {
  if (awayUntil) {
    homeState.away = {until: awayUntil, restoreTo: {...homeState.variables}};
    homeState.variables = {
      ...homeState.variables,
      bathroom: AWAY_TEMP,
      bedroom: AWAY_TEMP,
      kidsroom: AWAY_TEMP,
      studio: AWAY_TEMP,
    };
    saveVariables();
  }
}

export const removeAwayUntil = () => {
  if (homeState.away) {
    homeState.variables = {
      ...homeState.away.restoreTo,
    };
  }
  homeState.away = null;

  saveVariables();
};

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
