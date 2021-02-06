import { FETCH_REVIEWS_ERROR, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS } from '../types';

const initialState = {
  reviews: [],
  isFetching: false,
  error: null,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reviews: action.payload.reviews,
      };

    case FETCH_REVIEWS_ERROR:
      return {
        ...state,
        isFetching: false,
        reviews: action.error,
      };

    default:
      return state;
  }
};

export default reviews;
