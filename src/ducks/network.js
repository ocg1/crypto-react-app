import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
  network: { clearNetworkErrors, networkError },
} = createActions({
  NETWORK: {
    CLEAR_NETWORK_ERRORS: null,
    NETWORK_ERROR: null,
  },
});

const isNetworkErrorPresent = handleActions(
  {
    [networkError]: () => true,
    [clearNetworkErrors]: () => false,
  },
  false,
);

const errors = handleActions(
  {
    [networkError]: (_, { payload: { data } }) => data.message,
    [clearNetworkErrors]: () => null,
  },
  null,
);

const selectIsNetworkErrorPresentFrom = ({ network }) => network.isNetworkErrorPresent;
const selectErrorsFrom = ({ network }) => network.errors;

export { selectIsNetworkErrorPresentFrom, clearNetworkErrors, networkError, selectErrorsFrom };

export default combineReducers({ isNetworkErrorPresent, errors });
