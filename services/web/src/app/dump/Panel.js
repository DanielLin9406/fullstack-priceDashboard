import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const PanelContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0rem;
  margin-bottom: ${props => props.marginBottom};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  justify-content: ${props => props.jC};
`;

PanelContainer.propTypes = {
  marginBottom: string,
  jC: string
};

PanelContainer.defaultProps = {
  marginBottom: '0rem',
  jC: 'center'
};

const CurrentPromotionContainer = styled(PanelContainer).attrs({
  marginBottom: '0rem',
  jC: 'center'
})``;

const UserSectionContainer = styled(PanelContainer).attrs({
  marginBottom: '0rem',
  jC: 'space-around'
})``;

const Panel = ({ children }) => <PanelContainer>{children}</PanelContainer>;
const UserSectionPanel = ({ children }) => (
  <UserSectionContainer>{children}</UserSectionContainer>
);
const CurrentPromotionPanel = ({ children }) => (
  <CurrentPromotionContainer>{children}</CurrentPromotionContainer>
);

export default Panel;
export { UserSectionPanel, CurrentPromotionPanel };
