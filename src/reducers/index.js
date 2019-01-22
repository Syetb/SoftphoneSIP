import { combineReducers } from 'redux';

import pjsipReducer from './pjsip.reducer';

const rootReducer = combineReducers({
    pjsip: pjsipReducer
});

export default rootReducer;
