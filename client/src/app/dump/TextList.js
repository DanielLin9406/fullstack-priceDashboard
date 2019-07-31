import styled from 'styled-components';

const TextListContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextItemContainer = styled.span`
  margin: 0 0.2rem;
`;

const TextList = ({ children }) => {
  return <TextListContainer>{children}</TextListContainer>;
};

const TextItem = ({ children }) => {
  return <TextItemContainer>{children}</TextItemContainer>;
};

export default TextList;
export { TextItem };
