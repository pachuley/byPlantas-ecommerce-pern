import axios from "axios";
import {
  GET_ALL_ORDERS,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from "../types";
const { REACT_APP_BACKEND_URL } = process.env;
let userLocalstorage = JSON.parse(localStorage.getItem("userInfo"));

export const getAllOrders = () => (dispatch,getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  axios.get(`${REACT_APP_BACKEND_URL}/orders`, config).then((res) => {
    dispatch({ type: GET_ALL_ORDERS, payload: res.data });
  });
};

export const createOrder = (id) => (dispatch) => {
  axios
    .get(`${REACT_APP_BACKEND_URL}/orders/${id}/orders`, config)
    .then((res) => {
      dispatch({ type: CREATE_ORDER, payload: res.data });
    });
};
export const updateOrder = (id, status) => (dispatch, getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  console.log(id,status)
  axios
    .put(
      `${REACT_APP_BACKEND_URL}/orders/${id}`,
      { status: status },
      config
    )
    .then((res) => {
      dispatch({ type: UPDATE_ORDER, payload: res.data[0] });
    });
};

export const deleteOrder = (id) => (dispatch, getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  axios.delete(`${REACT_APP_BACKEND_URL}/orders/${id}`, config).then((res) => {
    dispatch({ type: DELETE_ORDER, payload: res.data });
  });
};

export const filterOrders = (state) => (dispatch, getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  axios.get(`${REACT_APP_BACKEND_URL}/orders`, config).then((res) => {
    console.log(res.data);
    let resp;
    if (state == "todas") {
      resp = res.data;
    } else {
      resp = res.data.filter((order) => order.status == state);
    }
    dispatch({ type: "FILTER_ORDERS", payload: resp });
  });
};
