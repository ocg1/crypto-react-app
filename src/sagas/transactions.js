import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchUserTransactionsRequest, fetchUserTransactionsFailure, fetchUserTransactionsSuccess } from '../ducks/transactions';
import { getUserTransactions } from 'api'
import requestFlow from "./request";

export function* transactionsWatch() {
  yield takeLatest(fetchUserTransactionsRequest, transactionsFlow)
}

function* transactionsFlow() {
  try {
    const { data } = yield call(requestFlow, getUserTransactions)
    yield put(fetchUserTransactionsSuccess(data))
  } catch(error) {
    yield put(fetchUserTransactionsFailure(error))
  }
}
