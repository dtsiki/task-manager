import React from 'react';

import Boards from './../../manager/Boards';

const Main: React.FC = () => {
  return (
    <>
      <h1>Task Manager</h1>
      <h2>Boards</h2>
      <Boards />
    </>
  );
};

export default Main;
