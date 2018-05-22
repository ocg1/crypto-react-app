import React from 'react';
import { Field, Form } from 'react-final-form';

import CustomField from 'components/CustomField';
import LoginForm from '../LoginForm';

describe('Component LoginForm', () => {
  const wrapper = shallow(<LoginForm {...{ handleSubmit: f => f, handleValidate: f => f }} />);
  const instance = wrapper.instance();

  describe('#render', () => {
    const formWrapper = wrapper.find(Form);

    it('should be contains component Form', () => {
      expect(formWrapper.exists()).toBeTruthy();
    });

    it('should be contains component Field', () => {
      expect(
        formWrapper
          .dive()
          .find(Field)
          .exists(),
      ).toBeTruthy();
    });
  }); // #render

  describe('#handleAuthTrigger', () => {
    it('changes state isLogIn', () => {
      const event = { preventDefault: () => {}, stopPropagation: () => {} };
      instance.handleAuthTrigger(event);

      expect(wrapper.state().isLogIn).toBeFalsy();
    });
  }); // #handleAuthTrigger
});
