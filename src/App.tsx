import React from 'react';

import Dashboard from './components/common/Dashboard';
import Header from './components/common/Header';
import Boards from './components/manager/Boards';

const App: React.FC = () => {
  return (
    <Dashboard>
      <Header />
      <Boards />
    </Dashboard>
  );
};

export default App;
