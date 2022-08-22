import React from 'react';

import './style.scss';

const Header: React.FC = () => {
  return (
    <div className='header'>
      <h1 className='header__title'>
        Task <span className='accent accent--dark'>Manager</span>
      </h1>
    </div>
  );
};

export default Header;
