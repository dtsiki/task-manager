import React from 'react';

import './style.scss';

interface Props {
  children?: React.ReactNode;
  buttonClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: string,
  icon?: React.ReactNode,
}

const Button: React.FC<Props> = ({ children, onClick, buttonClassName, variant, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`button button--${variant || 'primary'} ${buttonClassName ? ` ${buttonClassName}` : ''}`}
    >
      {children}
      {icon && <span className="button__icon">{icon}</span>}
    </button>
  );
};

export default Button;
