import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
  user: { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure },
} = createActions({
  USER: {
    GET_USER_INFO_REQUEST: null,
    GET_USER_INFO_SUCCESS: null,
    GET_USER_INFO_FAILURE: null,
  },
});

const isLoading = handleActions(
  {
    [getUserInfoRequest]: () => true,
    [getUserInfoSuccess]: () => false,
  },
  false,
);

const records = handleActions(
  {
    [getUserInfoSuccess]: (_, { payload }) => payload.result,
    [getUserInfoRequest]: () => null,
  },
  null,
);

const error = handleActions(
  {
    [getUserInfoFailure]: (_, action) => action.payload,
    [getUserInfoRequest]: () => null,
  },
  null,
);

const selectUserEmailFrom = ({ user: { records } }) => records && records.email

export { getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, selectUserEmailFrom };
export default combineReducers({ isLoading, records, error });
