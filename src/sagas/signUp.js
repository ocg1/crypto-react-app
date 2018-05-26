import { takeEvery, call, put } from 'redux-saga/effects';

import { newUser, userFailure, createUser } from 'ducks/signUp';
import requestFlow from './request';
import { registration } from 'api';
import { setTokenToLocalStorage } from 'localStorage';

export function* signUpWatch() {
  yield takeEvery(newUser, signUpFlow);
}

function* signUpFlow({ payload }) {
  try {
    const { data } = yield call(requestFlow, registration, payload);
    yield call(setTokenToLocalStorage, data.jwt)
    yield put(createUser(data.jwt));
  } catch (error) {
    yield put(userFailure(error));
  }
}
