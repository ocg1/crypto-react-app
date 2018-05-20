import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import AppRouter from './AppRouter';

import Login from '../Login';

jest.mock('../Login', () => () => 'Login Component');

describe('AppRouter', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <AppRouter />
    </MemoryRouter>,
  );

  describe('component contains', () => {
    describe('#render', () => {
      describe('should be exists', () => {
        it('Switch', () => {
          expect(wrapper.find(Switch).exists()).toBeTruthy();
        });

        it('default Route with props exact and path="/"', () => {
          const foundComponent = wrapper.findWhere(cmt => {
            const { exact, path, component } = cmt.props();
            return cmt.name() === Route.name && path === '/' && exact && component === Login;
          });

          expect(foundComponent.exists()).toBeTruthy();
        });

        describe.skip('PrivateRoute');
      })
    })
  });
});
