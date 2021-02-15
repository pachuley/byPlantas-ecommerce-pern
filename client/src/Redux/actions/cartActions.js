import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, FETCH_ITEMS_REQUEST, FETCH_ITEM_ERROR, CART_ITEMS_GET, FETCH_ITEMS_GUEST_REQUEST,
  CART_ADD_ITEM_GUEST,
  CART_REMOVE_ITEM_GUEST,       
  CART_REMOVE_ITEMS_GUEST,
  FETCH_ITEM_ERROR_GUEST,
  JOIN_CARTS} from '../types';
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

export const removeAllItems = () => async (dispatch,getState) => {
  const isAuth = getState().userLogin.userLogin;
  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };
  getState().cart.cartItems.forEach(async element => {
    try {
      const { data } = await axios.delete(`${REACT_APP_BACKEND_URL}/users/${isAuth.id}/cart/${element.productId}`, config);
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
  });
}


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

//GUEST
export const addToCartGuest = (id, quantity) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ITEMS_GUEST_REQUEST });

  try {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM_GUEST,
      payload: {
        productId: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        /* stock: data.stockProduct, */
        imgs: data.imgs,
        quantity: quantity,
        total: parseFloat(data.price) * parseInt(quantity),
      },
    });
    localStorage.setItem('cartItemsGuest', JSON.stringify(getState().cart.cartItemsGuest));
  } catch (error) {
    dispatch({
      type: FETCH_ITEM_ERROR_GUEST,
      error: error.toString(),
    });
  }
};

export const removeFromCartGuest = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM_GUEST,
    payload: id
  })
  localStorage.setItem('cartItemsGuest', JSON.stringify(getState().cart.cartItemsGuest));
}

export const removeAllItemsGuest = () => async (dispatch,getState) => {
  dispatch({
    type: CART_REMOVE_ITEMS_GUEST,
    payload: []
  })
  let arr = []
  localStorage.setItem('cartItemsGuest', JSON.stringify(arr));
}

export const joinCarts = () => async (dispatch,getState) => {
  let cartItemsAux = getState().cart.cartItems
  let cartItemsGuestAux = getState().cart.cartItemsGuest
  let orderIdAux = getState().orders.orderUser[0].id
  let arrAux = [...cartItemsAux]
  let discount = 0
  const isAuth = getState().userLogin.userLogin;

  let config = {
    headers: {
      'Content-Type': 'application/json',
      token: isAuth ? isAuth.token : null,
    },
  };

  if(cartItemsAux.length === 0 && cartItemsGuestAux.length > 0){
    cartItemsGuestAux.forEach(async e => {
      e.orderId = orderIdAux
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/users/${isAuth.id}/cart`,
        { productId: e.productId, quantity: e.quantity, discount },
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
      dispatch({
        type: CART_REMOVE_ITEM_GUEST,
        payload: e.productId
      })
      localStorage.setItem('cartItemsGuest', JSON.stringify(getState().cart.cartItemsGuest));
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    })
  }

  cartItemsAux.forEach(item => {
    cartItemsGuestAux.forEach(async itemGuest => {
      if(item.productId !== itemGuest.productId){
        itemGuest.orderId = orderIdAux
        arrAux = [...cartItemsAux, itemGuest]
        const { data } = await axios.post(
          `${REACT_APP_BACKEND_URL}/users/${isAuth.id}/cart`,
          { productId: itemGuest.productId, quantity: itemGuest.quantity, discount },
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
        dispatch({
          type: CART_REMOVE_ITEM_GUEST,
          payload: itemGuest.productId
        })
        localStorage.setItem('cartItemsGuest', JSON.stringify(getState().cart.cartItemsGuest));
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

      }
      else{
        dispatch({
          type: CART_REMOVE_ITEM_GUEST,
          payload: itemGuest.productId
        })
        localStorage.setItem('cartItemsGuest', JSON.stringify(getState().cart.cartItemsGuest));
      }
    })
  })
  dispatch({
    type: JOIN_CARTS
  })
}

