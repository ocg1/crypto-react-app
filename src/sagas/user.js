import { takeLatest, call, put } from 'redux-saga/effects';

import { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } from '../ducks/user';
import { getUserInfo } from 'api';
import requestFlow from './request';

export function* userWatch() {
  yield takeLatest(getUserInfoRequest, userFlow);
}

function* userFlow() {
  try {
    const { data } = yield call(requestFlow, getUserInfo);
    yield put(getUserInfoSuccess(data));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}
