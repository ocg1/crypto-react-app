import React from 'react';
import { Login } from '../Login';
import LoginForm from '../LoginForm';
import Particles from 'react-particles-js';

describe('Component Login', () => {
  const wrapper = shallow(<Login />);
  const instance = wrapper.instance();

  describe('component contains', () => {
    describe('#render', () => {
      it('should be contains Particles', () => {
        expect(wrapper.find(Particles).exists()).toBeTruthy();
      });

      it('should be contains LoginForm', () => {
        expect(wrapper.find(LoginForm).exists()).toBeTruthy();
      });
    }); // #render

    describe('#handleValidate', () => {
      describe('should be validates', () => {
        const authParams = { password: 'P@$$w0rd', email: faker.internet.email() };

        describe('password', () => {
          describe('if password is valid', () => {
            it('should be greater than 6 and contains capital letters, uppercase letters, numbers and symbols', () => {
              expect(instance.handleValidate(authParams)).toBeNull();
            });
          });

          describe('if password is invalid', () => {
            const authParams = { password: '123456789', email: faker.internet.email() };

            it('should not be contains capital letters, uppercase letters, numbers and symbols', () => {
              expect(instance.handleValidate(authParams)).toMatchObject({
                password: 'invalid format',
              });
            });

            it('should not be greater than 6', () => {
              expect(instance.handleValidate({ ...authParams, password: '1234' })).toMatchObject({
                password: "can't be less 6",
              });
            });
          });
        });
        describe('email', () => {
          describe('if email is valid', () => {
            it('should be contains [@] symbol', () => {
              expect(instance.handleValidate(authParams)).toBeNull();
            });
          });

          describe('if email is invalid', () => {
            it('should not be contains [@] symbol', () => {
              expect(
                instance.handleValidate({ ...authParams, email: faker.internet.domainName() }),
              ).toMatchObject({ email: 'invalid format' });
            });
          });
        });
      });
    }); // #handleValidate

    describe('#handleSubmit', () => {
      describe('if attribute isLogIn is true', () => {
        it('should be calls #createSession');
      });

      describe('if attribute isLogIn is false', () => {
        it('should be calls #createUser');
      });
    }); // #handleSubmit
  });
});
