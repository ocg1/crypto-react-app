import { compose, initialize, length, format, fieldExtract, consolidate } from './index';

describe('Validators', () => {
  const entity = { password: faker.internet.password() };

  describe('#compose', () => {
    it('should be return entity', () => {
      const fn = () => entity => entity;

      expect(compose(fn())(entity)).toMatchObject(entity);
    });
  }); // #compose

  describe('#initialize', () => {
    it('should be return extended Object with props', () => {
      expect(initialize({ errors: {} })(entity)).toMatchObject({ ...entity, errors: {} });
    });
  }); // #initialize

  describe('#length', () => {
    const entity = { password: faker.internet.password(), errors: {} };

    describe('if validate is truthy', () => {
      it('should be return object with empty errors', () => {
        expect(length({ min: 3 })(entity).errors.password).toBeUndefined();
      });
    });

    describe('if validate is falsey', () => {
      it('should be return object with errors', () => {
        expect(length({ max: 2 })(entity).errors.password).toHaveLength(1);
      });
    });
  }); // #length

  describe('#format', () => {
    describe('if validate is truthy', () => {
      const entity = { password: faker.internet.password(), errors: {} };

      it('should be return object with empty errors', () => {
        expect(format({ format: /\w/ })(entity).errors.password).toBeUndefined();
      });
    });

    describe('if validate is falsey', () => {
      const entity = { password: '123', errors: {} };

      it('should be return Object with errors', () => {
        expect(format({ format: /[asd]/ })(entity).errors.password).toHaveLength(1);
      });
    });
  }); // #format

  describe('#fieldExtract', () => {
    describe('if object property is not empty', () => {
      it('should be return object by key with first value of array', () => {
        const errors = { errors: { password: ['wrong', 'no blank'] } };

        expect(fieldExtract('errors')({ ...entity, ...errors })).toMatchObject({
          password: 'wrong',
        });
      });
    });

    describe('if object is empty', () => {
      it('should be return null', () => {
        expect(fieldExtract('errors')({ ...entity })).toBeNull();
      });
    });
  }); // #fieldExtract

  describe('#consolidate', () => {
    describe('if args is empty or null', () => {
      it('should be return null', () => {
        expect(consolidate(null, null)).toBeNull();
      });
    });

    describe('if args is array of object', () => {
      it('should be return merge object', () => {
        const passwordError = { errors: { password: 'pass' } };
        const loginError = { errors: { login: 'user' } };

        expect(consolidate(loginError, passwordError)).toMatchObject({
          ...loginError,
          ...passwordError,
        });
      });
    });
  }); // #consolidate
});
