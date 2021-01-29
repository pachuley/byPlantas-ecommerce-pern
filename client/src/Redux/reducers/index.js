import {combineReducers} from 'redux'

const initialState = {guestId: 1, logged:false}

function firstReducer(state = initialState, action){
    return state;
}

export default combineReducers({firstReducer})