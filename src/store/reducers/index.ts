import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { globalReducer, globalState } from './global';

const createRootReducer = (history: History) => {
  const reducers = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
  });
  return reducers;
};

export interface reducerType {
  router: {
    location: {
      pathname: string;
      search: string;
      hash: string;
    };
    action: string;
  };
  global: globalState,
}

export default createRootReducer;
