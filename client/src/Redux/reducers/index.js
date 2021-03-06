import {combineReducers} from 'redux'
import products from './productReducer'
import userLogin from './userReducer'
import reviews from './reviewReducer'
import orders from "./orderReducer";
import {cartReducer} from './cartReducer'
import users from './fetchUsersReducer'
import {emailReducer} from './sendEmailReducer'


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
    cart: cartReducer,
    email:emailReducer,
    orders,
    users
})
