import React from 'react';

import Dashboard from './components/common/Dashboard';
import Main from './components/pages/Main';

const App: React.FC = () => {
  return (
    <Dashboard>
      <Main />
    </Dashboard>
  );
}

export default App;
