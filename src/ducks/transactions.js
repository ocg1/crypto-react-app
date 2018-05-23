import { handleActions, createActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { getSelectedCurrency } from './currency';
import * as _ from 'lodash';

const {
  transactions: {
    fetchUserTransactionsRequest,
    fetchUserTransactionsSuccess,
    fetchUserTransactionsFailure,
  },
} = createActions({
  TRANSACTIONS: {
    FETCH_USER_TRANSACTIONS_REQUEST: null,
    FETCH_USER_TRANSACTIONS_SUCCESS: null,
    FETCH_USER_TRANSACTIONS_FAILURE: null,
  },
});

const isLoading = handleActions(
  {
    [fetchUserTransactionsRequest]: () => true,
    [fetchUserTransactionsSuccess]: () => false,
  },
  false,
);

const records = handleActions(
  {
    [fetchUserTransactionsSuccess]: (_, { payload }) => payload.result,
  },
  null,
);

const error = handleActions(
  {
    [fetchUserTransactionsFailure]: (_, action) => action.payload,
    [fetchUserTransactionsRequest]: () => null,
  },
  null,
);

const compose = (...fns) => entity => fns.reduce((memo, fn) => fn(memo), entity);

const filterHistoryBySelectedCurrency = selectedCurrency => state => {
  const { records } = state.transactions;
  if (!records) return [];

  return records.filter(record => Object.keys(record).includes(`${selectedCurrency}_delta`));
};

const transformObjectKeysToCamelCase = entities => {
  if (entities.length === 0) return [];

  return entities.map(entity => _.transform(entity, (memo, value, key) => memo[_.camelCase(key)] = value, {}))
};

const selectTransactionsHistoryFrom = state => {
  const selectedCurrency = getSelectedCurrency(state);
  const records = compose(filterHistoryBySelectedCurrency(selectedCurrency), transformObjectKeysToCamelCase)(state);
  const delta = `${selectedCurrency}Delta`;

  return records.map(({ usdDelta, createdAt, ...tail }) => ({
    usdDelta,
    createdAt,
    [delta]: tail[delta],
  }));
};

export {
  fetchUserTransactionsRequest,
  fetchUserTransactionsSuccess,
  fetchUserTransactionsFailure,
  selectTransactionsHistoryFrom,
};
export default combineReducers({ isLoading, records, error });
