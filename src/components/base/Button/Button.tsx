import React from 'react';

import './style.scss';

interface Props {
  children: React.ReactNode;
  buttonClassName?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: string,
  icon?: React.ReactNode,
}

const Button: React.FC<Props> = ({ children, onClick, buttonClassName, variant, icon }: Props) => {
  const classNames = buttonClassName || `button button--${variant}`;

  return (
    <button
      onClick={onClick}
      className={classNames}
      type='submit'
    >
      {children}
      {icon && <span className='button__icon'>{icon}</span>}
    </button>
  );
};

export default Button;
