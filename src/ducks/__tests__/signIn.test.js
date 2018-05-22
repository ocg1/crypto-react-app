import auth, { createSession, destroySession } from '../signin';

const INIT_STATE = { isAuthorized: false };

describe('Auth reducers', () => {
  describe('initial state', () => {
    it('should be eq INIT_STATE', () => {
      const state = auth(undefined, '@@TEST/INIT');
      expect(state).toEqual(INIT_STATE);
    });
  });

  describe('#createSession', () => {
    it('should be isAuthorized is true', () => {
      const state = auth(INIT_STATE, createSession())
      expect(state.isAuthorized).toBeTruthy()
    })
  }); // #createSession

  describe('#destroySession', () => {
    it('should be isAuthorized is false', () => {
      const state = auth(INIT_STATE, destroySession())
      expect(state.isAuthorized).toBeFalsy()
    })
  }) // #destroySession
});
