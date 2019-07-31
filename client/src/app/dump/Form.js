import React from 'react';
import styled from 'styled-components';
import { Col } from '@app/dump/RowCol';
import Select from '@app/dump/Select';
import Input from '@app/dump/Input';

const Form = styled.form`
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  width: 100%;
`;

const FormCol = styled.div`
  flex: 0 0 38%;
  max-width: 38%;
  display: flex;
  flex-direction: column;
`;

const FormCtrlCol = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  text-align: center;
`;

const FormLabel = styled(Col.Label)``;
const FormSelect = styled(Select)``;

FormCol.Label = FormLabel;
FormCol.Select = FormSelect;
FormCol.Input = styled(Input).attrs({ type: 'text' })``;

export default Form;
export { FormCol, FormCtrlCol };
