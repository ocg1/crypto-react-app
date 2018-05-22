import { fork } from 'redux-saga/effects';

import { authFlow } from './signIn';
import { signUpWatch } from "./signUp";

export default function*() {
  yield fork(authFlow)
  yield fork(signUpWatch)
}
