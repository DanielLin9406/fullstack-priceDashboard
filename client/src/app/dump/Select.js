import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.select`
  border: 1px solid #b5b5b5;
  border-radius: 3px;
  height: 30px;
  background: #fff;
  box-sizing: border-box;
  padding-left: 0.4rem;
`;

const Select = ({ children, ...props }) => {
  return <SelectContainer {...props}>{children()}</SelectContainer>;
};

export default Select;
