import {commonActions} from './types';

import {Dispatch} from 'redux';
import {HomeState, TempReadings, Variables, Power} from '@monorepo/core';
import heatingService from '../../api/heatingService';
import {AxiosResponse} from 'axios';

export const getHomeState = () => async (dispatch: Dispatch) => {
  const response: AxiosResponse<HomeState> = await heatingService.get(
    '/system/state',
  );
  const {variables, power, temp} = response.data;
  dispatch({type: commonActions.homeTemp, payload: temp});
  dispatch({type: commonActions.power, payload: power});
  dispatch({type: commonActions.variables, payload: variables});
};

export const getHomeTemperature = () => async (dispatch: Dispatch) => {
  const response: AxiosResponse<TempReadings> = await heatingService.get(
    '/temp',
  );
  dispatch({type: commonActions.homeTemp, payload: response.data});
};

export const setMinTemp = (room: string, temp: number) => async (
  dispatch: Dispatch,
) => {
  try {
    console.log(`COMMON/SET/${room.toUpperCase()} temp: ${temp}`);
    await heatingService.put('/temp', {
      room,
      temp: String(temp),
    });
    dispatch({type: `COMMON/SET/${room.toUpperCase()}`, payload: String(temp)});
  } catch (e) {
    console.error(`Error setting ${room} temp`);
  }
};

export type CommonActionType =
  | {type: typeof commonActions.variables; payload: Variables}
  | {type: typeof commonActions.power; payload: Power}
  | {type: typeof commonActions.homeTemp; payload: TempReadings}
  | {type: typeof commonActions.setStudioTemp; payload: string}
  | {type: typeof commonActions.setBathromTemp; payload: string}
  | {type: typeof commonActions.setKidsroomTemp; payload: string}
  | {type: typeof commonActions.setBedroomTemp; payload: string};
