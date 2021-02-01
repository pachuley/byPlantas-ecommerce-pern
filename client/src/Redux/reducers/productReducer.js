import {FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_ERROR} from '../types'

const initialState = {
    products: [],
    isFetching: false,
    error: null
}

const products = (state = initialState, action) => {
    switch(action.type){

        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_PRODUCTS_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    products: action.payload.products,
                }

        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default products