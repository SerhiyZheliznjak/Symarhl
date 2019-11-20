import {Room} from '@monorepo/core';
import {HomeState, NO_READINGS, PowerState} from '@monorepo/core';

const homeState: HomeState = {
  temp: {
    studio: NO_READINGS,
    bathroom: NO_READINGS,
    bedroom: NO_READINGS,
    kidsroom: NO_READINGS
  },
  variables: {
    studio: NO_READINGS,
    bathroom: NO_READINGS,
    kidsroom: NO_READINGS,
    bedroom: NO_READINGS,
    interval: NO_READINGS,
    hysteresis: NO_READINGS,
    nightShift: NO_READINGS
  },
  power: {
    pump: '-1',
    wall: '-1',
    studio: '-1',
    bathroom: '-1',
    kidsroom: '-1',
    bedroom: '-1'
  }
};

export function setVariables(
  variable: keyof HomeState['variables'],
  val: number
) {
  homeState.variables[variable] = val;
}

export function setPower(power: keyof HomeState['power'], state: PowerState) {
  homeState.power[power] = state;
}

export function setTemp(room: Room, temp: number) {
  homeState.temp[room] = temp;
}

export function getState() {
  return homeState;
}
