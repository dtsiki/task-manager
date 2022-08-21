import React from 'react';

import './style.scss';

interface Props {
  children?: React.ReactNode;
}

const Dashboard: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className='dashboard'>{children}</div>
  );
};

export default Dashboard;
