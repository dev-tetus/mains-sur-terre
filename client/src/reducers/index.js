import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import isLogged from "./isLoggedReducer";

const reducers = combineReducers({
  auth: isLogged,
  cart: cartReducer,
});

export default reducers;
