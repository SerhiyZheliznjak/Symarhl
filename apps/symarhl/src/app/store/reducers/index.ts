import {combineReducers} from 'redux';
import {screenReducer} from './web';
import {homeStateReducer, tempReducer, variablesReducer} from './common';

const combined = combineReducers({
  screen: screenReducer,
  temperature: tempReducer,
  variables: variablesReducer,
  homeState: homeStateReducer,
});

export type StoreType = ReturnType<typeof combined>;

export default combined;
