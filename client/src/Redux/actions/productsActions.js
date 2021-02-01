import axios from 'axios'
import {FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_REQUEST} from '../types'
const {REACT_APP_BACKEND_URL} = process.env;

//action async
export const fetchProducts = () => async (dispatch) => {
    dispatch({type: FETCH_PRODUCTS_REQUEST})

    axios.get(`${REACT_APP_BACKEND_URL}/products`)
        .then(res => {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: {
                    products: res.data
                }
            })
        })
    .catch(error => {
        dispatch({
            type: FETCH_PRODUCTS_ERROR,
            error: error.toString()
        })
    })
}

export const sortProducts = () => (dispatch) => {
    
}