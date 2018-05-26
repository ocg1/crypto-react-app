import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  buyCurrencySuccess,
  sellCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencyFailure,
  buyCurrencyRequest,
  sellCurrencyRequest,
} from './currency';

const {
  wallet: { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure },
} = createActions({
  WALLET: { FETCH_WALLET_REQUEST: null, FETCH_WALLET_SUCCESS: null, FETCH_WALLET_FAILURE: null },
});

const isLoading = handleActions(
  {
    [fetchWalletRequest]: () => true,
    [fetchWalletSuccess]: () => false,
  },
  false,
);
const error = handleActions(
  {
    [fetchWalletFailure]: (_, { payload }) => payload,
    [buyCurrencyFailure]: (_, { payload }) => payload,
    [sellCurrencyFailure]: (_, { payload }) => payload,
    [fetchWalletRequest]: () => null,
    [buyCurrencyRequest]: () => null,
    [sellCurrencyRequest]: () => null,
  },
  null,
);

const coins = handleActions(
  {
    [fetchWalletSuccess]: (state, { payload: { btc, eth, usd } }) => ({
      ...state,
      ...{ btc, eth, usd },
    }),
    [buyCurrencySuccess]: (state, { payload: { btc, eth, usd } }) => ({
      ...state,
      ...{ btc, eth, usd },
    }),
    [sellCurrencySuccess]: (state, { payload: { btc, eth, usd } }) => ({
      ...state,
      ...{ btc, eth, usd },
    }),
  },
  { btc: 0, eth: 0, usd: 0 },
);

const getError = ({ wallet }) => wallet.error;
const selectWalletFrom = ({ wallet }) => wallet.coins;

export { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure, getError, selectWalletFrom };

export default combineReducers({ isLoading, error, coins });
