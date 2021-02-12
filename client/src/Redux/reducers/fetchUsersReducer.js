import { FETCH_USERS_ERROR, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from '../types';

const initialState = {
    users: [],
    isFetching: false,
    error: null,
};

const users = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload.users,
            };

        case FETCH_USERS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };

        default:
            return state;
    }
}

export default users;