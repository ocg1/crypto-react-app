import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
  currency: {
    buyCurrencyFailure,
    buyCurrencyRequest,
    buyCurrencySuccess,
    fetchBtcFailure,
    fetchBtcRequest,
    fetchBtcSuccess,
    fetchEthFailure,
    fetchEthRequest,
    fetchEthSuccess,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure,
    selectBtc,
    selectEth,
    selectOffset,
  },
} = createActions({
  CURRENCY: {
    BUY_CURRENCY_FAILURE: null,
    BUY_CURRENCY_REQUEST: null,
    BUY_CURRENCY_SUCCESS: null,
    FETCH_BTC_FAILURE: null,
    FETCH_BTC_REQUEST: null,
    FETCH_BTC_SUCCESS: null,
    FETCH_ETH_FAILURE: null,
    FETCH_ETH_REQUEST: null,
    FETCH_ETH_SUCCESS: null,
    SELECT_BTC: null,
    SELECT_ETH: null,
    SELECT_OFFSET: null,
    SELL_CURRENCY_FAILURE: null,
    SELL_CURRENCY_REQUEST: null,
    SELL_CURRENCY_SUCCESS: null,
  },
});

const error = handleActions(
  {
    [buyCurrencyFailure]: (_, { payload }) => payload,
    [sellCurrencyFailure]: (_, { payload }) => payload,
    [fetchBtcFailure]: (_, { payload }) => payload,
    [fetchEthFailure]: (_, { payload }) => payload,
    [buyCurrencyRequest]: () => null,
    [sellCurrencyRequest]: () => null,
    [fetchBtcRequest]: () => null,
    [fetchEthRequest]: () => null,
  },
  null,
);

const isBtcLoading = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
  },
  false,
);
const isEthLoading = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
  },
  false,
);

const selected = handleActions(
  {
    [selectBtc]: () => 'btc',
    [selectEth]: () => 'eth',
  },
  'btc',
);

const offset = handleActions(
  {
    [selectOffset]: (_, action) => action.payload,
  },
  '4h',
);

const btc = handleActions(
  {
    [fetchBtcSuccess]: (_, { payload }) =>
      payload.reduce((memo, value, index) => ({ ...memo, [index]: value }), {}),
  },
  null,
);

const eth = handleActions(
  {
    [fetchEthSuccess]: (_, { payload }) =>
      payload.reduce((memo, value, index) => ({ ...memo, [index]: value }), {}),
  },
  null,
);

const getOffset = ({ currency }) => currency.offset;

const getCurrentCurrencyData = (fnSelectedCurrency, state) => {
  const selectedCurrency = fnSelectedCurrency(state);
  const { currency } = state;

  return currency[selectedCurrency];
};

const getCurrentCurrencyPurchase = state => {
  const currencyData = getCurrentCurrencyData(getSelectedCurrency, state);

  return currencyData ? currencyData[0].purchase : 0;
};

const getCurrentCurrencySell = state => {
  const currencyData = getCurrentCurrencyData(getSelectedCurrency, state);

  return currencyData ? currencyData[0].sell : 0;
};

const getSelectedCurrency = ({ currency }) => currency.selected;

const getBtcSellPrice = ({ currency }) => {
  const { btc } = currency;

  return btc ? btc[0].sell.toFixed(1) : 0;
};

const getEthSellPrice = ({ currency }) => {
  const { eth } = currency;

  return eth ? eth[0].sell.toFixed(1) : 0;
};

const selectCurrentCurrencySellsFrom = state => {
  const currencyData = getCurrentCurrencyData(getSelectedCurrency, state);

  return currencyData ? Object.values(currencyData).map(({ mts, sell }) => [mts, sell]) : [];
};

const selectCurrentCurrencyPurchasesFrom = state => {
  const currencyData = getCurrentCurrencyData(getSelectedCurrency, state);

  return currencyData ? Object.values(currencyData).map(({ mts, purchase }) => [mts, purchase]) : [];
};

export {
  buyCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  fetchBtcFailure,
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchEthFailure,
  fetchEthRequest,
  fetchEthSuccess,
  getBtcSellPrice,
  getEthSellPrice,
  getOffset,
  getCurrentCurrencyPurchase,
  getCurrentCurrencySell,
  getSelectedCurrency,
  selectBtc,
  selectEth,
  selectCurrentCurrencySellsFrom,
  selectCurrentCurrencyPurchasesFrom,
  selectOffset,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
};

export default combineReducers({ btc, eth, offset, isBtcLoading, isEthLoading, selected, error });
