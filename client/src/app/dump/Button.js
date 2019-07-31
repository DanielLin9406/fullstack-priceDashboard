import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: ${props => props.fillColor};
`;

Button.propTypes = {
  fillColor: string
};

const GreenButton = styled(Button).attrs({
  fillColor: '#008072'
})``;

const RedButton = styled(Button).attrs({
  fillColor: '#f42e65'
})``;

const CrossButtonContainer = styled.button`
  width: 32px;
  height: 32px;
  padding: 5px;
  margin: auto;
  color: ${props => props.fillColor};
  border: none;
  font-size: 1.8rem;
  position: relative;
  background: transparent;
  & > span {
    position: absolute;
    left: 0;
    right: 0;
    top: -7px;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100%;
  }
`;

const CrossRedButtonContainer = styled(CrossButtonContainer).attrs({
  fillColor: '#f42e65'
})``;

const CrossRedButton = ({ children }) => (
  <CrossRedButtonContainer>
    <span>{children}</span>
  </CrossRedButtonContainer>
);

const ForkButtonContainer = styled.button`
  background: transparent;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const ForkButton = ({ children }, props) => (
  <ForkButtonContainer {...props}>{children}</ForkButtonContainer>
);

const FlatButton = styled.button`
  width: 85%;
  border: none;
  background: transparent;
  text-align: left;
  padding-left: 7%;
`;

export default Button;
export { GreenButton, RedButton, CrossRedButton, ForkButton, FlatButton };
