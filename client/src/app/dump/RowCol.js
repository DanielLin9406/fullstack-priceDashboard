import React from 'react';
import styled from 'styled-components';
import RowLabelBase from '@app/dump/Label';
import { ColInputWrap } from '@app/dump/Input';

const RowGroup = styled.div`
  flex: 0 0 100%;
  padding-left: 3%;
  padding-right: 3%;
  box-sizing: border-box;
`;

const RowLabel = styled(RowLabelBase)``;

const ColGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  flex: 0 0 100%;
`;

const ColInputContainer = styled.div`
  width: 100%;
  margin-top: 0;
  margin-bottom: 7px;
  div {
    width: inherit;
  }
  input {
    width: inherit;
    border: 1px solid #b5b5b5;
    border-radius: 3px;
    height: 30px;
    background: #fff;
    box-sizing: border-box;
    padding-left: 0.4rem;
  }
`;

const ColGroupDate = styled(ColGroup)`
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 46%;
`;

const ColInput = props => {
  const Component = props.component;
  if (Component) {
    return (
      <ColInputContainer>
        <Component {...props} />
      </ColInputContainer>
    );
  }
  return (
    <ColInputContainer>
      <ColInputWrap {...props} />
    </ColInputContainer>
  );
};

Col.Label = RowLabel;
Col.Input = ColInput;

export default RowGroup;
export { ColGroup, ColGroupDate, Col, Row, ColInput };
