import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk  from 'redux-thunk';

//export const store = createStore(rootReducer, applyMiddleware(thunk));

// export default configureStore = () => {
//     let store = createStore(rootReducer, applyMiddleware(thunk));
//     return store
// }

export default function configureStore(initialState) {
    const finalCreateStore = applyMiddleware(thunk)(createStore);
    return finalCreateStore(rootReducer, initialState)
}
