import { combineReducers } from "redux";
import { screenReducer } from "./webReducers";
import {
  tempReducer,
  variablesReducer,
  homeStateReducer
} from "./commonReducers";

const combined = combineReducers({
  screen: screenReducer,
  temperature: tempReducer,
  variables: variablesReducer,
  homeState: homeStateReducer
});

export type StoreType = ReturnType<typeof combined>;

export default combined;
