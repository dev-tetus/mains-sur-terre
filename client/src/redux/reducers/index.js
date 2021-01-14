import { combineReducers } from "redux";
import cartReducer from "./redux/reducers/cartReducer";
import isLogged from "./redux//reducers/isLoggedReducer";

const reducers = combineReducers({
  auth: isLogged,
  cart: cartReducer,
});

export default reducers;
