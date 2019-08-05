import React from 'react';
import { FormCol, FormCtrlCol } from '@app/dump/Form';
import styled from 'styled-components';

const SetList = styled.ul`
  width: 100%;
`;

const SetItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin: 1rem 0;
`;

const SetItemColContainer = styled(FormCol)`
  text-align: left;
`;
const SetItemCtrlCol = styled(FormCtrlCol)``;

const SetItemCol = ({ children }) => {
  return (
    <SetItemColContainer>
      <p>{children}</p>
    </SetItemColContainer>
  );
};

export default SetList;
export { SetItem, SetItemCol, SetItemCtrlCol };
