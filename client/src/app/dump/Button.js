import styled from 'styled-components';
import { string } from 'prop-types';

const Button = styled.button`
  padding: 10px;
  margin-left: 5%;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: ${props => props.fillColor};
`;

Button.propTypes = {
  fillColor: string
};

const GreenButton = styled(Button).attrs({
  fillColor: '#008072'
})``;

export default Button;
export { GreenButton };
