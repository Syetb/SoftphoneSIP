import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk  from 'redux-thunk';

//export const store = createStore(rootReducer, applyMiddleware(thunk));

// export default configureStore = () => {
//     let store = createStore(rootReducer, applyMiddleware(thunk));
//     return store
// }

// export default function configureStore(initialState) {
//     const finalCreateStore = applyMiddleware(thunk)(createStore);
//     return finalCreateStore(rootReducer, initialState)
// }

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store
}
