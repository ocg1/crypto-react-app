import React from 'react';
import styled from 'styled-components';

const ButtonOffset = styled.button`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#6AB4DD' : 'transparent')};
  color: ${props => (props.selected ? 'white' : '#9998a1')};
  padding: 2px 16px;
`;

const offsetButton = ({ offsetKey, selectedOffset, handleClick, children }) => (
  <ButtonOffset onClick={() => handleClick(offsetKey)} selected={selectedOffset === offsetKey}>
    {children}
  </ButtonOffset>
);

export default offsetButton;
