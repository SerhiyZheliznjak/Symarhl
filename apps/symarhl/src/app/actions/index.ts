import {webActions, commonActions} from './types';

import {Dispatch} from 'redux';
import {RoomsTemp, Variables, HomeState} from '../interfaces';
import heatingService from '../api/heatingService';
import {AxiosResponse} from 'axios';

export const getHomeState = () => async (dispatch: Dispatch) => {
  const response: AxiosResponse<HomeState> = await heatingService.get(
    '/system/state',
  );
  dispatch({type: commonActions.homeState, payload: response.data});
};

export const getHomeTemperature = () => async (dispatch: Dispatch) => {
  const response: AxiosResponse<RoomsTemp> = await heatingService.get('/temp');
  dispatch({type: commonActions.homeTemp, payload: response.data});
};

export const setMinTemp = (room: string, temp: number) => async (
  dispatch: Dispatch,
) => {
  try {
    console.log(`COMMON/SET/${room.toUpperCase()}`);
    await heatingService.put('/temp', {
      room,
      temp: String(temp),
    });
    dispatch({type: `COMMON/SET/${room.toUpperCase()}`, payload: String(temp)});
  } catch (e) {
    console.error(`Error setting ${room} temp`);
  }
};

export const ratioChange = (payload: number) => ({
  type: webActions.windowRatio,
  payload,
});

export type CommonActionType =
  | {type: typeof commonActions.variables; payload: Variables}
  | {type: typeof commonActions.homeTemp; payload: RoomsTemp}
  | {type: typeof commonActions.homeState; payload: HomeState}
  | {type: typeof commonActions.setBathromTemp; payload: string};

export type WebActionType = ReturnType<typeof ratioChange>;
