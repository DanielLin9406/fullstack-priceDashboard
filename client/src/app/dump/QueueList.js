import React from 'react';
import styled from 'styled-components';

const QueueList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const QueueItemContainer = styled.li`
  list-style: none;
  width: 90%;
  margin: auto;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  & + .queue-promotion-item {
    margin-top: 2%;
  }
`;

const ActiveQueueItemContainer = styled(QueueItemContainer)`
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-left: 5px solid #008072;
  }
`;

const QueueItem = ({ children, active, ...props }) => {
  if (active) {
    return <ActiveQueueItemContainer>{children}</ActiveQueueItemContainer>;
  }
  return <QueueItemContainer>{children}</QueueItemContainer>;
};

export default QueueList;
export { QueueItem };
