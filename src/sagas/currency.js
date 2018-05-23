import { takeLatest, fork, take, select, put, cancel, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { createSession, destroySession } from 'ducks/signIn';
import {
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  getOffset,
  selectBtc,
  selectEth,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  fetchEthSuccess,
  selectOffset,
} from 'ducks/currency';
import { candles, getWallet, buyCurrency, sellCurrency } from '../api';
import { fetchWalletRequest, fetchWalletSuccess, fetchWalletFailure } from 'ducks/wallet';
// import { changeLocation } from '../actions/location';
import { fetchUserTransactionsRequest } from 'ducks/transactions';

function* fetchBtcFlow(action) {
  try {
    const response = yield call(candles, 'btc', action.payload);
    yield put(fetchBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

function* fetchEthFlow(action) {
  try {
    const response = yield call(candles, 'eth', action.payload);
    yield put(fetchEthSuccess(response.data.result));
  } catch (error) {
    yield put(fetchEthFailure(error));
  }
}

function* loginCurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([
      createSession,
      destroySession,
      selectBtc,
      selectEth,
      selectOffset,
      // changeLocation,
    ]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== destroySession.toString()) currencyTask = yield fork(loginCurrencyFlow);
  }
}

function* fetchWalletFlow() {
  try {
    const response = yield call(getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}

export function* buyCurrencyWatch() {
  yield takeLatest(buyCurrencyRequest, buyCurrencyFlow);
}

function* buyCurrencyFlow({ payload }) {
  try {
    const { data } = yield call(buyCurrency, payload.selectedCurrency, payload.value);
    yield put(buyCurrencySuccess(data));
    yield put(fetchUserTransactionsRequest());
  } catch (error) {
    yield put(buyCurrencyFailure(error));
  }
}

export function* sellCurrencyWatch() {
  yield takeLatest(sellCurrencyRequest, sellCurrencyFlow);
}

function* sellCurrencyFlow({ payload }) {
  try {
    const { data } = yield call(sellCurrency, payload.selectedCurrency, payload.value);
    yield put(sellCurrencySuccess(data));
    yield put(fetchUserTransactionsRequest());
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}
