import { call, put, select } from 'redux-saga/effects';
import { selectIsNetworkErrorPresentFrom, clearNetworkErrors, networkError } from 'ducks/network';
import { destroySession } from 'ducks/signIn';

export default function*(fn, args) {
  try {
    const response = yield call(fn, args);
    const error = yield select(selectIsNetworkErrorPresentFrom)
    if (error) yield put(clearNetworkErrors());
    return response;
  } catch (error) {
    yield put(networkError(error));
    if (error.status === 401) yield put(destroySession());

    throw error;
  }
}
