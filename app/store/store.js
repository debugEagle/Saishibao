import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

// let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// let store = createStoreWithMiddleware(rootReducer);
// let state = store.getState();
//
// alert(state.HotList.isLoading)
function createStoreX(initialState){
  const enhancer = compose(
    applyMiddleware(thunk),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools(/*options*/) :
      noop => noop
  );
  const store = createStore(rootReducer, initialState, enhancer);
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  return store;
}

const store = createStoreX();

export default store;
