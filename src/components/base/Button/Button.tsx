import React from 'react';

import './style.scss';

interface Props {
  children?: React.ReactNode;
  buttonClassName?: string;
  onClick: () => void;
  variant?: string,
}

const Button: React.FC<Props> = ({ children, onClick, buttonClassName, variant }) => {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant || 'primary'} ${buttonClassName ? ` ${buttonClassName}` : ''}`}

    >
      {children}
    </button>
  );
};

export default Button;
