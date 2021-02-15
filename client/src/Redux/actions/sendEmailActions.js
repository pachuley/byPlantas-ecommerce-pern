import {SEND_EMAIL, ERROR_SEND_EMAIL, REQUEST_SEND_EMAIL} from '../types'
import axios from 'axios'
const {REACT_APP_BACKEND_URL} = process.env;

export const sendEmail = (name, email, message, subject) => async (dispatch) => {
    dispatch({type: REQUEST_SEND_EMAIL})

    try {
        const { data } = await axios.post(
            `${REACT_APP_BACKEND_URL}/email/send`,
            {name, email, message, subject}
          );
        console.log(data)
        dispatch({
            type: SEND_EMAIL,
            payload: data.message
        })
        
    } catch (error) {
        
    }
}