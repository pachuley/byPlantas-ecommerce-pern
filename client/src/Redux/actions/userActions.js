import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_RESET_PASSWORD } from '../types';
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
      payload: 'Error al loguearse',
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: USER_LOGIN_LOGOUT
  })
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  window.location = '/'
}
export const resetPassword= (password, token,email)=>(dispatch)=>{
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type:USER_RESET_PASSWORD
  })
  axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/users/reset/resetpassword`, { newPassword: password, token:token,email:email })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e;
    });
}