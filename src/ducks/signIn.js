import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
  signIn: { newSession, createSession, destroySession, sessionSuccess, sessionFailure },
} = createActions({
  SIGN_IN: {
    NEW_SESSION: null,
    CREATE_SESSION: null,
    DESTROY_SESSION: null,
    SESSION_SUCCESS: null,
    SESSION_FAILURE: null,
  },
});

const isAuthorized = handleActions(
  {
    [createSession]: () => true,
    [newSession]: () => false,
    [destroySession]: () => false,
  },
  false,
);

const error = handleActions(
  {
    [sessionFailure]: (_, { payload: { data } }) => data.message,
    [newSession]: () => null,
    [sessionSuccess]: () => null,
  },
  null,
);

const isFailed = handleActions(
  {
    [sessionFailure]: () => true,
    [newSession]: () => false,
    [sessionSuccess]: () => false,
  },
  false,
);

const selectIsAuthorizedFrom = ({ signIn }) => signIn.isAuthorized;
const selectSignInErrorFrom = ({ signIn }) => signIn.error;
const selectSignInIsFailedFrom = ({ signIn }) => signIn.isFailed;

export {
  createSession,
  destroySession,
  sessionSuccess,
  sessionFailure,
  selectSignInErrorFrom,
  selectIsAuthorizedFrom,
  selectSignInIsFailedFrom,
  newSession,
};
export default combineReducers({ isAuthorized, error, isFailed });
