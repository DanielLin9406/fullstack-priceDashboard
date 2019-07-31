import styled from 'styled-components';

const FlatSpan = styled.span`
  display: block;
  margin: 10px 0;
`;

const PromoNameSpan = styled(FlatSpan)`
  font-size: 1rem;
`;

const PromoPeriodSpan = styled(FlatSpan)`
  font-size: 0.8rem;
  color: #898989;
`;

const QueueSpan = styled.span`
  margin-left: 0.5rem;
`;

export default FlatSpan;
export { PromoNameSpan, PromoPeriodSpan, QueueSpan };
