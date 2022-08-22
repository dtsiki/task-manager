import React from 'react';

import './style.scss';

interface Props {
  wrapperInputClassName?: string,
  inputClassName?: string,
  labelClassName?: string,
  isLabelVisuallyHidden?: boolean,
  type?: string,
  value: string,
  onChange: (name: string, value: string) => void,
  placeholder: string,
  inputName?: string,
  label: string,
  icon?: React.ReactNode,
  invertFocus?: boolean
}

const Input: React.FC<Props> = ({
  wrapperInputClassName,
  inputClassName,
  labelClassName,
  isLabelVisuallyHidden = false,
  type = 'text',
  value,
  onChange,
  placeholder,
  inputName = 'input',
  label,
  icon,
  invertFocus = false
}: Props) => {
  const classNames = `input${icon ? ' input--has-icon' : ''}${wrapperInputClassName ? ` ${wrapperInputClassName}` : ''}`;

  return (
    <div className={classNames}>
      {icon && <div className='input__icon'>{icon}</div>}
      <label
        className={`input__label${isLabelVisuallyHidden ? ' input__label--hidden' : ''}${
          labelClassName ? ` ${labelClassName}` : ''
        }`}
        htmlFor={inputName}
      >
        {label}
      </label>
      <input
        className={`input__field${inputClassName ? ` ${inputClassName}` : ''}${invertFocus ? ' input__field--inverted' : ''}`}
        type={type}
        name={inputName}
        id={inputName}
        placeholder={placeholder}
        value={value}
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>): void => onChange(e.target.value, e.target.name)
        }
      />
    </div>
  );
};

export default Input;
