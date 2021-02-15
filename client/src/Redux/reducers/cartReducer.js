import { CART_ADD_ITEM,CART_ITEMS_GET, CART_REMOVE_ITEM, FETCH_ITEMS_REQUEST, FETCH_ITEM_ERROR,FETCH_ITEMS_GUEST_REQUEST,
  CART_ADD_ITEM_GUEST,
  CART_REMOVE_ITEM_GUEST,
  CART_ITEMS_GET_GUEST,
  CART_REMOVE_ITEMS_GUEST,
  FETCH_ITEM_ERROR_GUEST,
  JOIN_CARTS
} from '../types';

const cartItemsStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const cartItemsStorageGuest = localStorage.getItem('cartItemsGuest') ? JSON.parse(localStorage.getItem('cartItemsGuest')) : [];

const initialState = {
  cartItems: cartItemsStorage,
  cartItemsGuest: cartItemsStorageGuest,
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
    case CART_ITEMS_GET:
      return {
        ...state,
        isFetching: false,
        cartItems: action.payload,
    }

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
      /* case CART_REMOVE_ITEMS_GUEST:
        return  */

    case FETCH_ITEM_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

      case FETCH_ITEMS_GUEST_REQUEST:
        return {
          ...state,
          isFetching: true,
        };
      case CART_ITEMS_GET_GUEST:
        return {
          ...state,
          isFetching: false,
          cartItemsGuest: action.payload,
      }
      case CART_ADD_ITEM_GUEST:
  
          const itemGuest = action.payload;
          const existItemGuest = state.cartItemsGuest.find(i => i.productId === itemGuest.productId);
  
          if(existItemGuest){
            let auxArrayGuest = state.cartItemsGuest.filter(it => {
              return it.productId !== itemGuest.productId;
            });
            return {
              ...state,
              cartItemsGuest: [...auxArrayGuest, action.payload],
              isFetching: false,
            };
          }else{
            return {
              ...state,
              cartItemsGuest: [...state.cartItemsGuest, action.payload]
            }
          }
  
      case CART_REMOVE_ITEM_GUEST:
        return{
          ...state,
          cartItemsGuest: state.cartItemsGuest.filter(item => item.productId !== action.payload)
        }
      
      case CART_REMOVE_ITEMS_GUEST:
        return {
          ...state,
          cartItemsGuest: action.payload
        }

        case JOIN_CARTS:
          return{
            ...state
          }

    default:
      return state;
  }
};
