import React from 'react';
import styled from 'styled-components';

const AvatarContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgb(109, 109, 109);
  p {
    line-height: 30px;
    color: #fff;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserAvatar = ({ children }) => (
  <AvatarContainer>
    <p>{children}</p>
  </AvatarContainer>
);

const UserName = ({ children }) => <NameContainer>{children}</NameContainer>;

export default UserAvatar;
export { UserName };
