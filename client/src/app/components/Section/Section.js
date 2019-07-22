import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading/Loading';

const SectionContainer = styled.section`
  flex: 0 0 30%;
  margin-top: 1%;
  margin-bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border: 1px solid #f5f5f5;
  background: #f7f7f7;
  border-radius: 4px;
`;

const SectionBodyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Section = ({ className, children }) => {
  return <SectionContainer className={className}>{children}</SectionContainer>;
};
const SectionBody = ({ isLoading, children, className }) => {
  return (
    <SectionBodyContainer className={className}>
      <Loading active={isLoading}>{children}</Loading>
    </SectionBodyContainer>
  );
};

export default Section;
export { SectionBody };
