import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LoginError from "../Login/LoginError";

const FieldWrapper = styled.div`
  position: relative;

  span {
    width: 19px;
    height: 19px;
    opacity: 0.4;
    background-size: cover;
    position: absolute;
    top: 25px;
    left: 21px;
  }

  input {
    margin: 10px 0;
    padding: 16px 6px 16px 53px;
    border: 1px solid #dfdfdf;
    border-radius: 7px;
    width: calc(100% - 62px);

    &:invalid {
      border: 1px solid red;
    }
  }
`;

const FieldIcon = styled.span`
  background-image: url(${({ url }) => url});
`;

const customField = ({ input, type, placeholder, iconUrl, meta }) => (
  <FieldWrapper>
    <FieldIcon url={iconUrl} />
    <input {...input} placeholder={placeholder} type={type} />
    { meta.touched && <LoginError error={meta.error} /> }
  </FieldWrapper>
);

customField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

export default customField;
