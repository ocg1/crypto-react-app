import { call, put, select } from 'redux-saga/effects';

import { getIsNetworkErrorPresent, clearNetworkErrors, networkError } from 'ducks/network';
import { destroySession } from 'ducks/signIn';
import requestFlow from '../request';

describe('Request saga', () => {
  describe('#requestFlow', () => {
    const mockFn = jest.fn();
    const mockArg = faker.lorem.word();
    const sagaFlow = requestFlow(mockFn, mockArg);

    describe('without errors', () => {
      it('should be call callback with args', () => {
        expect(sagaFlow.next().value).toEqual(call(mockFn, mockArg));
      });

      it('should be select #isNetWorkErrorPresent from state', () => {
        expect(sagaFlow.next().value).toEqual(select(getIsNetworkErrorPresent));
      });

      describe('if isNetworkErrorPresent is true, than', () => {
        it('should be put #clearNetworkErrors', () => {
          expect(sagaFlow.next({ networks: { isNetWorkErrorPresent: true } }).value).toEqual(
            put(clearNetworkErrors()),
          );
        });
      });
    });
    describe('with errors', () => {
      const error = { response: { status: 401 } };

      it('should be put #networkError with erorr', () => {
        expect(sagaFlow.throw(error).value).toEqual(put(networkError(error)));
      });

      describe('if error response code is 401', () => {
        it('should be put #destroySession', () => {
          expect(sagaFlow.next().value).toEqual(put(destroySession()));
        });
      });
    });
  });
});
