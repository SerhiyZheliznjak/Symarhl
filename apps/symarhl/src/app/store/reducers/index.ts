import {combineReducers} from 'redux';
import {screenReducer} from './web';
import {powerReducer, tempReducer, variablesReducer} from './common';

const combined = combineReducers({
  screen: screenReducer,
  temperature: tempReducer,
  variables: variablesReducer,
  power: powerReducer,
});

export type StoreType = ReturnType<typeof combined>;

export default combined;
