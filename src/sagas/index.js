import { fork } from 'redux-saga/effects';

import { authFlow } from './signIn';
import { signUpWatch } from './signUp';
import {
  currencyWatch,
  fetchWalletWatch,
  fetchBtcWatch,
  fetchEthWatch,
  buyCurrencyWatch,
  sellCurrencyWatch,
} from './currency';
import { transactionsWatch } from './transactions';
import { userWatch } from './user';

export default function*() {
  yield fork(authFlow);
  yield fork(signUpWatch);
  yield fork(currencyWatch);
  yield fork(fetchWalletWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(transactionsWatch);
  yield fork(userWatch);
  yield fork(buyCurrencyWatch);
  yield fork(sellCurrencyWatch);
}
