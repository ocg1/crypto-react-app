import React from 'react';
import Login from './Login';
import Particles from "react-particles-js";
import { Form, Field } from "react-final-form";

describe('Login', () => {
  const wrapper = shallow(<Login />);

  describe('component contains', () => {
    describe('#render', () => {
      it('should be contains Particles', () => {
        expect(wrapper.find(Particles).exists()).toBeTruthy()
      })
    });
  });
});
