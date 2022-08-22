import React from 'react';

import './style.scss';

interface Props {
  toggleName: any,
  value: any,
  label: string,
  wrapperClassName?: string,
  toggleClassName?: string,
  labelClassName?: string,
  checked: boolean,
  changeValue: any,
}

const Toggle:React.FC<Props> = ({
  toggleName,
  value,
  changeValue,
  label,
  wrapperClassName,
  toggleClassName,
  labelClassName,
  checked
} : Props) => {
  return (
    <div className={`toggle${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <input
        className={`toggle__input${toggleClassName ? ` ${toggleClassName}` : ''}`}
        type='checkbox'
        name={toggleName}
        id={toggleName}
        value={value}
        onChange={
          (e: React.ChangeEvent<HTMLInputElement>) => { return changeValue(e.target.value); }
        }
        checked={checked}
      />
      <label
        className={`toggle__label${labelClassName ? ` ${labelClassName}` : ''}`}
        htmlFor={toggleName}>
        {label}
      </label>
    </div>
  );
};

export default Toggle;
