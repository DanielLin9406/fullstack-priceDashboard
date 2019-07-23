import React from 'react';
// import { string } from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 5%;
`;
const ListHeader = styled.h3`
  padding: 20px 10px 20px 5%;
  text-align: left;
`;

const PriceList = ({ children }) => <List>{children}</List>;

const PriceListHeader = ({ children }) => <ListHeader>{children}</ListHeader>;

export default PriceList;
export { PriceListHeader };
