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

const Discount = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding-top: 5%;
  padding-bottom: 5%;
  background: #f7f7f7;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

Discount.Price = styled.span`
  margin-left: 5%;
`;

const PriceList = ({ children }) => <List>{children}</List>;
const PriceListHeader = ({ children }) => <ListHeader>{children}</ListHeader>;
const DiscountPrice = ({ children }) => (
  <Discount>
    <span>Discount price</span>
    <Discount.Price>{children}</Discount.Price>
  </Discount>
);

export default PriceList;
export { PriceListHeader, DiscountPrice };
