import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
  signUp: { newUser, createUser, userFailure },
} = createActions({
  SIGN_UP: { NEW_USER: null, CREATE_USER: null, USER_FAILURE: null },
});

const error = handleActions(
  {
    [userFailure]: (_, { payload: { data } }) => data.message,
    [newUser]: {},
    [createUser]: {},
  },
  {},
);

const isFailed = handleActions(
  {
    [userFailure]: () => true,
    [newUser]: () => false,
    [createUser]: () => false,
  },
  false,
);

const selectSignUpErrorFrom = ({ signUp }) =>
  Object.entries(signUp.error).map(error => error.join(' '));
const selectSignUpIsFailedFrom = ({ signUp }) => signUp.isFailed;

export { newUser, createUser, userFailure, selectSignUpErrorFrom, selectSignUpIsFailedFrom };
export default combineReducers({ isFailed, error });
