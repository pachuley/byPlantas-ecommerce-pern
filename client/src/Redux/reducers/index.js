import {combineReducers} from 'redux'
import products from './productReducer'

const initialState = {guestId: 1, logged:false}

function firstReducer(state = initialState, action){
    return state;
}

export default combineReducers({
    firstReducer,
    products
})