import { combineReducers } from 'redux';
import npcReducer from './npcReducer';

const rootReducer = combineReducers({
    // imported reducers go here
    npcReducer
})

export default rootReducer;