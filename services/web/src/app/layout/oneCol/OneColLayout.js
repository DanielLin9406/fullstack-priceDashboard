import React from 'react';
import styled from 'styled-components';
import Header from '@app/components/Header/Container';

const Body = styled.div``;

function OneColLayout(props) {
  const { children, ...rest } = props;
  return (
    <>
      <Header />
      <Body {...rest}>{children}</Body>
    </>
  );
}

export default OneColLayout;
