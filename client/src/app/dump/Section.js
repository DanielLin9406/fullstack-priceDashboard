import React from 'react';
import styled from 'styled-components';
import Loading from '@app/components/Loading/Loading';

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

const SectionHeaderContainer = styled.h2`
  background: #fff;
  font-size: 1.3rem;
  display: block;
  padding: 8px 0;
  margin-top: 0;
  width: 100%;
  border-bottom: 2px solid #f4f4f4;
`;

const SectionSubHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 50px;
`;

const Section = ({ className, children }) => (
  <SectionContainer className={className}>{children}</SectionContainer>
);

const SectionHeader = ({ children }) => (
  <SectionHeaderContainer>{children}</SectionHeaderContainer>
);

const SectionSubHeader = ({ children }) => (
  <SectionSubHeaderContainer>{children}</SectionSubHeaderContainer>
);

const SectionBody = ({ isLoading, children, className }) => (
  <SectionBodyContainer className={className}>
    <Loading active={isLoading}>{children}</Loading>
  </SectionBodyContainer>
);

export default Section;
export { SectionBody, SectionHeader, SectionSubHeader };
