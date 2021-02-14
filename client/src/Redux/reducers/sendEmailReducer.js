import {SEND_EMAIL, ERROR_SEND_EMAIL, REQUEST_SEND_EMAIL} from '../types'

const initialState = {
    emailResponse: null,
};

export const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL:
            return {
                emailResponse: action.payload
            }
    
        default:
            return {
                state
            }
    }
} 