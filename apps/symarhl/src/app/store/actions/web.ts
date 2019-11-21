import {webActions} from './types';

export const ratioChange = (payload: number) => ({
  type: webActions.windowRatio,
  payload,
});

export type WebActionType = ReturnType<typeof ratioChange>;
