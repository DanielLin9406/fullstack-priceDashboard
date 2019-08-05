import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #b5b5b5;
  border-radius: 3px;
  height: 30px;
  background: #fff;
  box-sizing: border-box;
  padding-left: 0.4rem;
`;

const ColInputWrap = styled(Input)`
  width: inherit;
  padding-left: 0.4rem;
  margin-top: 0;
`;

export default Input;
export { ColInputWrap };
