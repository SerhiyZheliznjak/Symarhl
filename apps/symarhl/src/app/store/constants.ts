import {HomeState, NO_READINGS} from '@monorepo/core';

export const initialState: HomeState = {
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
