import { combineReducers } from 'redux';

import pjsipReducer from './pjsip.reducer';
import navigation from './navigate.reducer'

const rootReducer = combineReducers({
    pjsip: pjsipReducer,
    navigate: navigation
});

export default rootReducer;
