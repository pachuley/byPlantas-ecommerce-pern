import axios from "axios";
import {
  GET_ALL_ORDERS,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from "../types";
const { REACT_APP_BACKEND_URL } = process.env;
let userLocalstorage = JSON.parse(localStorage.getItem("userInfo"));
let config = {
  headers: {
    "Content-Type": "application/json",
    token: userLocalstorage !== null ? userLocalstorage.token : null,
  },
};
export const getAllOrders = () => (dispatch) => {
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
export const updateOrder = (state) => (dispatch, getState) => {
  axios
    .put(
      `${REACT_APP_BACKEND_URL}/orders/${state.orderId}`,
      { state: state.status },
      config
    )
    .then((res) => {
      dispatch({ type: UPDATE_ORDER, payload: res.data });
    });
};

export const deleteOrder = (id) => (dispatch, getState) => {
  axios.delete(`${REACT_APP_BACKEND_URL}/orders/${id}`, config).then((res) => {
    dispatch({ type: DELETE_ORDER, payload: res.data });
  });
};

export const filterOrders = (state) => (dispatch) => {
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
