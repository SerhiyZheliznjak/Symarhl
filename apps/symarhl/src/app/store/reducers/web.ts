import {webActions} from '../actions/types';
import {WebActionType} from '../actions/web';
import {getRatio} from '../../utility/screen';

const INITIAL_STATE = {
  isLandscape: getRatio() > 1,
};

export function screenReducer(state = INITIAL_STATE, action: WebActionType) {
  switch (action.type) {
    case webActions.windowRatio:
      return {
        ...state,
        isLandscape: action.payload > 1,
      };
    default:
      return state;
  }
}
