import {combineReducers} from 'redux'

const initialState = {userId: 0, logged:false}

function firstReducer(state = initialState, action){
    switch(action.type){
        case 'CHANGE_LOGIN': 
            return {...state, logged:true, userId: action.userId}
        default:
            return state
    }
}

export default combineReducers({firstReducer})