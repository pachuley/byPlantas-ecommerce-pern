import { combineReducers } from "redux";
import products from "./productReducer";
import userLogin from "./userReducer";
import reviews from "./reviewReducer";
import orders from "./orderReducer";

const initialState = { userId: 0, logged: false };

function firstReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_LOGIN":
      return { ...state, logged: true, userId: action.userId };
    default:
      return state;
  }
}

export default combineReducers({
  firstReducer,
  products,
  userLogin,
  reviews,
  orders,
});
