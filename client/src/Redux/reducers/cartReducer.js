import { CART_ADD_ITEM, CART_REMOVE_ITEM, FETCH_ITEMS_REQUEST, FETCH_ITEM_ERROR } from '../types';

const cartItemsStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
  cartItems: cartItemsStorage,
  isFetching: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(i => i.id === item.id);

      if (existItem) {
        let auxArray = state.cartItems.filter(it => {
          return it.productId !== item.productId;
        });
        return {
          ...state,
          cartItems: [...auxArray, action.payload],
          isFetching: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          isFetching: false,
        };
      }

    case CART_REMOVE_ITEM: 
      return {
        ...state,
        cartItems: state.cartItems.filter(x=> x.productId !== parseInt(action.payload)),
        isFetching: false,
      }

    case FETCH_ITEM_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};
