import React from 'react';
// import { string } from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 3px 0;
  &:last-child {
    margin-bottom: 3%;
  }
`;

Item.Text = styled.p`
  text-align: center;
  max-width: 33%;
  min-width: 33%;
`;

Item.User = styled(Item.Text)`
  text-align: left;
  font-size: 0.8rem;
  color: #898989;
`;

Item.Span = styled.span`
  padding-left: 25%;
`;
Item.TitleSpan = styled.span`
  padding-left: 0%;
`;

Item.SalePrice = styled(Item.Text)`
  text-align: left;
  font-size: 1rem;
`;
Item.PromoPrice = styled(Item.Text)`
  text-align: left;
  font-size: 1rem;
  color: #f42e65;
`;
Item.DefaultPrice = styled(Item.Text)`
  text-align: left;
  font-size: 0.5rem;
  color: #888;
`;

Item.Checkbox = styled.input.attrs({ type: 'Checkbox' })`
  &:checked {
    color: #008072;
  }
`;

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
const PriceItemTextUser = ({ children }) => (
  <Item.User>
    <Item.TitleSpan>{children}</Item.TitleSpan>
  </Item.User>
);
const PriceItemTextSalePrice = ({ children }) => (
  <Item.SalePrice>
    <Item.Span>{children}</Item.Span>
  </Item.SalePrice>
);
const PriceItemTextPromoPrice = ({ children }) => (
  <Item.PromoPrice>
    <Item.Span>{children}</Item.Span>
  </Item.PromoPrice>
);
const PriceItemTextDefaultPrice = ({ children }) => (
  <Item.DefaultPrice>
    <Item.Span>{children}</Item.Span>
  </Item.DefaultPrice>
);

const PriceItemTextCheckbox = props => {
  return (
    <Item.Text>
      <Item.Checkbox {...props} />
    </Item.Text>
  );
};

const PriceItemHeader = ({ children }) => <ItemHeader>{children}</ItemHeader>;
const PriceItemTextHeader = ({ children }) => (
  <ItemHeader.Text>
    <ItemHeader.Span>{children}</ItemHeader.Span>
  </ItemHeader.Text>
);

PriceItem.Header = PriceItemHeader;
PriceItemText.Header = PriceItemTextHeader;
PriceItemText.User = PriceItemTextUser;
PriceItemText.SalePrice = PriceItemTextSalePrice;
PriceItemText.PromoPrice = PriceItemTextPromoPrice;
PriceItemText.DefaultPrice = PriceItemTextDefaultPrice;
PriceItemText.Checkbox = PriceItemTextCheckbox;

export default PriceItem;
export { PriceItemText };
