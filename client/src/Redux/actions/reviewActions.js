import axios from 'axios'
import {FETCH_REVIEWS_ERROR, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS} from '../types'
const {REACT_APP_BACKEND_URL} = process.env;

export const fetchReviews = (idProd) => async (dispatch) => {
    console.log(idProd)
    dispatch({type: FETCH_REVIEWS_REQUEST})

    axios.get(`${REACT_APP_BACKEND_URL}/products/${idProd}/review`)
        .then(res => {
            dispatch({
                type: FETCH_REVIEWS_SUCCESS,
                payload: {
                    reviews: res.data.result
                }
            })
        })
        .catch(error => {
            dispatch({
                type: FETCH_REVIEWS_ERROR,
                error: error.toString()
            })
        })
} 