import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const PanelContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0rem;
  margin-bottom: ${props => props.marginBottom};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
`;

PanelContainer.propTypes = {
  marginBottom: string
};

PanelContainer.defaultProps = {
  marginBottom: '0rem'
};

const CurrentPromotionPanelContainer = styled(PanelContainer).attrs({
  marginBottom: '0rem'
})``;

const Panel = ({ children }) => <PanelContainer>{children}</PanelContainer>;

export default Panel;
export { CurrentPromotionPanelContainer };
