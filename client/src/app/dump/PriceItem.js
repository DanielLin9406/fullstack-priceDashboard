import React from 'react';
// import { string } from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 3px 0;
`;

Item.Text = styled.p`
  text-align: center;
  max-width: 33%;
  min-width: 33%;
`;

Item.Span = styled.span``;

const ItemHeader = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 3px 0;
`;

ItemHeader.Text = styled.p`
  text-align: left;
  max-width: 33%;
  min-width: 33%;
`;

ItemHeader.Span = styled.span`
  color: #c8c8c8;
  font-size: 0.5rem;
  padding-left: 25%;
`;

const PriceItem = ({ children }) => <Item>{children}</Item>;

const PriceItemText = ({ children }) => (
  <Item.Text>
    <Item.Span>{children}</Item.Span>
  </Item.Text>
);

const PriceItemHeader = ({ children }) => <ItemHeader>{children}</ItemHeader>;

const PriceItemHeaderText = ({ children }) => (
  <ItemHeader.Text>
    <ItemHeader.Span>{children}</ItemHeader.Span>
  </ItemHeader.Text>
);

PriceItem.Header = PriceItemHeader;
PriceItemText.Header = PriceItemHeaderText;

export default PriceItem;
export { PriceItemText };
