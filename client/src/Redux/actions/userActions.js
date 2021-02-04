import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../types';
const { REACT_APP_BACKEND_URL } = process.env;

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${REACT_APP_BACKEND_URL}/users/login`, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: USER_LOGIN_LOGOUT
  })
  localStorage.removeItem('userInfo');
  window.location = '/';
}