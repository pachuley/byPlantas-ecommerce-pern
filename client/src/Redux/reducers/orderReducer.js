const initialState = {
  orders: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "CREATE_ORDER":
      return {
        ...state,
        orders: action.payload,
      };
    case "DELETE_ORDER": //
      return {
        ...state,
      };

    case "UPDATE_ORDER":
      return {
        ...state,
      };
    case "FILTER_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
export default orders;
