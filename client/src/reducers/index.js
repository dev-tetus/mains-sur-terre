import { combineReducers } from "redux";
import isLogged from "./isLogged";

const reducers = combineReducers({
  auth: isLogged,
});

export default reducers;
