import { USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../types';

const userInfoStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
console.log('acaaa',userInfoStorage)
const initialState = {
    userLogin: {userInfo:userInfoStorage},
    isFetching: false,
    error: null
}



const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case USER_LOGIN_LOGOUT:
      return {
        ...state,
        userLogin: {userInfo: null}};
    default:
      return state;
  }
};

export default userLoginReducer;
