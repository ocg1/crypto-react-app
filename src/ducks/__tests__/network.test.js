import network, {
  getIsNetworkErrorPresent,
  clearNetworkErrors,
  networkError,
  selectErrorsFrom,
} from '../network';

const INIT_STATE = { isNetworkErrorPresent: false, errors: null };

describe('Network reducers', () => {
  describe('initial state', () => {
    it('should be eq INIT_STATE', () => {
      const state = network(undefined, '@@TEST/INIT');

      expect(state).toEqual(INIT_STATE);
    });
  });

  describe('#clearNetworkErrors', () => {
    it('should be clears errors', () => {
      const state = network({ ...INIT_STATE, errors: faker.lorem.word() }, clearNetworkErrors());

      expect(state.errors).toBeNull();
    });

    it('should be set isNetworkErrorPresent to false', () => {
      const state = network({ ...INIT_STATE, isNetworkErrorPresent: true }, clearNetworkErrors());

      expect(state.isNetworkErrorPresent).toBeFalsy()
    });
  });

  describe('#networkError', () => {
    const error = { response: { data: { message: faker.lorem.word() } } };

    it('should be set error from payload', () => {
      const state = network(INIT_STATE, networkError(error));

      expect(state.errors).not.toBeNull();
    });

    it('should be set isNetworkErrorPresent to true', () => {
      const state = network(INIT_STATE, networkError(error))

      expect(state.isNetworkErrorPresent).toBeTruthy()
    })
  });
});
