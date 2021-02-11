import axios from 'axios'
import {FETCH_USERS_ERROR, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from '../types'
const {REACT_APP_BACKEND_URL} = process.env;

export const fetchUsers = () => (dispatch) => {
    dispatch({type: FETCH_USERS_REQUEST})

    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'token': userLocalstorage !== null ? userLocalstorage.token : null
        },
    };

    axios.get(`${REACT_APP_BACKEND_URL}/users`, config)
    .then(res=>{
        const newData = res.data.map(x=>({id: x.id, email: x.email, role: x.role, status: x.status}))
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: {
                users: newData
            }
        })
    })
    .catch(error =>{
        dispatch({
            type: FETCH_USERS_ERROR,
            error: error.toString()
        })
    })
}