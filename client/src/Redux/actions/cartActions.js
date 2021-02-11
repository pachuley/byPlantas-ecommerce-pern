import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, FETCH_ITEMS_REQUEST, FETCH_ITEM_ERROR, CART_ITEMS_GET } from '../types';
const { REACT_APP_BACKEND_URL } = process.env;

//TODO: ver stock en action
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ITEMS_REQUEST });
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  let discount = 0;

  try {

    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/users/${isAuth.id}/cart`,
      { productId: parseInt(id), quantity, discount },
      config
    );

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        orderId: data.orderId,
        productId: data.productId,
        name: data.productName,
        description: data.productDescription,
        price: data.productPrice,
        /* stock: data.stockProduct, */
        imgs: data.imgs,
        quantity: data.quantity,
        total: data.total,
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    dispatch({
      type: FETCH_ITEM_ERROR,
      error: error.toString(),
    });
  }
};

export const removeFromCart = id => async (dispatch, getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  try {
    const { data } = await axios.delete(`${REACT_APP_BACKEND_URL}/users/${isAuth.id}/cart/${id}`, config);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: data.id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    dispatch({
      type: FETCH_ITEM_ERROR,
      error: error.toString(),
    });
  }
};

export const getItems = () => async (dispatch,getState) => {
  dispatch({type: FETCH_ITEMS_REQUEST})
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
 
  try {
    const {data} = await axios.get(`${REACT_APP_BACKEND_URL}/users/${isAuth.id}/orderlines`,config)
    dispatch({
      type: CART_ITEMS_GET,
      payload: data,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    dispatch({
      type: FETCH_ITEM_ERROR,
      error: error.toString(),
    });
  }     
}
