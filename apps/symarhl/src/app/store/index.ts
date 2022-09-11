import {HomeState, RoomNames} from '@monorepo/core';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import heatingService from '../api/heatingService';
import {initialState} from './constants';

export const putMinTemp = createAsyncThunk(
  'home/putMinTemp',
  async (payload: {room: RoomNames; temp: number}) => {
    const {room, temp} = payload;
    await heatingService.put('/temp', {
      room,
      temp: String(temp),
    });
    return payload;
  },
);

export const fetchHomeState = createAsyncThunk(
  'home/fetchHomeState',
  async () => {
    const response: AxiosResponse<HomeState> = await heatingService.get(
      '/system/state',
    );
    return response.data;
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeState: (_: HomeState, {payload}: PayloadAction<HomeState>) => {
      return payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(
      fetchHomeState.fulfilled,
      (_: HomeState, {payload}: PayloadAction<HomeState>) => payload,
    );

    builder.addCase(
      putMinTemp.fulfilled,
      (
        state: HomeState,
        {payload: {room, temp}}: PayloadAction<{room: RoomNames; temp: number}>,
      ) => {
        const newState: HomeState = {
          ...state,
          variables: {
            ...state.variables,
            [room]: temp,
          },
        };
        return newState;
      },
    );
  },
});

export const {
  actions: {setHomeState},
  reducer: home,
} = homeSlice;
