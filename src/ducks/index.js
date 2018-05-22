import { combineReducers } from 'redux';

import network from "./network"
import signIn from "./signIn";
import signUp from "./signUp";

export default combineReducers({ signIn, network, signUp });
