import {commonActions} from '../actions/types';
import {CommonActionType} from '../actions/common';
import {HomeState, NO_READINGS, RoomTemp, Variables} from '@monorepo/core';

const INITIAL_VARIABLES_STATE: Variables = {
  studio: NO_READINGS,
  bathroom: NO_READINGS,
  kidsroom: NO_READINGS,
  bedroom: NO_READINGS,
  hysteresis: NO_READINGS,
  interval: NO_READINGS,
  nightShift: NO_READINGS,
};

export function variablesReducer(
  state = INITIAL_VARIABLES_STATE,
  action: CommonActionType,
) {
  switch (action.type) {
    case commonActions.variables:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

const INITIAL_TEMP_STATE: RoomTemp = {
  studio: NO_READINGS,
  bathroom: NO_READINGS,
  kidsroom: NO_READINGS,
  bedroom: NO_READINGS,
};

export function tempReducer(
  state = INITIAL_TEMP_STATE,
  action: CommonActionType,
) {
  switch (action.type) {
    case commonActions.homeTemp:
      return {
        ...action.payload,
      };
    case commonActions.setBathromTemp:
      return {
        ...state,
        bathroom: action.payload,
      };
    default:
      return state;
  }
}

const INITIAL_HOME_STATE: HomeState = {
  temp: INITIAL_TEMP_STATE,
  variables: INITIAL_VARIABLES_STATE,
  power: {
    ...(Array.from(Object.keys(INITIAL_TEMP_STATE)).reduce(
      (res, key) => ({...res, [key]: '-1'}),
      {},
    ) as HomeState['power']),
    pump: '-1',
    wall: '-1',
  },
};

export function homeStateReducer(
  state = INITIAL_HOME_STATE,
  action: CommonActionType,
) {
  switch (action.type) {
    case commonActions.homeState:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
