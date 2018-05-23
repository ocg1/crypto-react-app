import { combineReducers } from 'redux';

import network from './network';
import signIn from './signIn';
import signUp from './signUp';
import currency from './currency';
import wallet from './wallet';
import transactions from './transactions';
import user from './user';

export default combineReducers({ signIn, network, signUp, currency, wallet, transactions, user });
