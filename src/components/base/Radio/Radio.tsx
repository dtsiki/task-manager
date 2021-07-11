import React from 'react';

import './style.scss';

interface Props {
  radioName: any,
  value: any,
  label: string,
  wrapperClassName?: string,
  radioClassName?: string,
  labelClassName?: string,
  checked: boolean,
  changeValue: (value: string) => void,
}

const Radio:React.FC<Props> = ({ radioName, value, changeValue, label, wrapperClassName, radioClassName, labelClassName, checked }) => {
  return (
    <div className={`radio${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <input
        className={`radio__input${radioClassName ? ` ${radioClassName}` : ''}`}
        type="radio"
        name={radioName}
        id={radioName}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValue(e.target.value)}
        checked={checked}
      />
      <label className={`radio__label${labelClassName ? ` ${labelClassName}` : ''}`} htmlFor={radioName}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
