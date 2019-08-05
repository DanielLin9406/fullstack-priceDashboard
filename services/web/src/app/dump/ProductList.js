import React from 'react';
// import { string } from 'prop-types';
import styled from 'styled-components';

const ProductListContainer = styled.ul`
  display: flex;
  padding: 0;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  list-style: none;
  flex-wrap: wrap;
  width: 98%;
  margin-left: auto;
  margin-right: auto;
`;

const ProductItemContainer = styled.li`
  display: inline-block;
  flex: 0 0 32%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 15px;
  padding: 0%;
  border-radius: 5px;
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16),
    0px 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
`;

const ProductItem = ({ children }) => (
  <ProductItemContainer>{children}</ProductItemContainer>
);

const ProductList = ({ children }) => (
  <ProductListContainer>{children}</ProductListContainer>
);

export default ProductList;
export { ProductItem };
