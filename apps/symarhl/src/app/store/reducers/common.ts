import {commonActions} from '../actions/types';
import {CommonActionType} from '../actions/common';
import {NO_READINGS, RoomTemp, Variables, Power} from '@monorepo/core';

const INITIAL_VARIABLES_STATE: Variables = {
  studio: NO_READINGS,
  bathroom: NO_READINGS,
  kidsroom: NO_READINGS,
  bedroom: NO_READINGS,
  hysteresis: NO_READINGS,
  interval: NO_READINGS,
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
    case commonActions.setStudioTemp:
      return {
        ...state,
        studio: action.payload,
      };
    case commonActions.setBathromTemp:
      return {
        ...state,
        bathroom: action.payload,
      };
    case commonActions.setKidsroomTemp:
      return {
        ...state,
        kidsroom: action.payload,
      };
    case commonActions.setBedroomTemp:
      return {
        ...state,
        bedroom: action.payload,
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
    default:
      return state;
  }
}

const INITIAL_POWER_STATE: Power = {
  pump: '-1',
  studio: '-1',
  bathroom: '-1',
  kidsroom: '-1',
  bedroom: '-1',
  wall: '-1',
};

export function powerReducer(
  state = INITIAL_POWER_STATE,
  action: CommonActionType,
) {
  switch (action.type) {
    case commonActions.power:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
