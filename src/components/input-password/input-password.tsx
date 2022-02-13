import React, { useState, forwardRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

type TInputPasswordProps = {
  placeholder: string;
  value: string;
  error?: boolean;
  errorText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputPassword = forwardRef<HTMLInputElement, TInputPasswordProps>
  (({ placeholder, error = false, errorText, value, onChange, ...rest }, ref) => {
    const [isHidden, setIsHidden] = useState(true);
    return (
      <Input
        ref={ref}
        type={isHidden ? 'password' : 'text'}
        icon={isHidden ? 'ShowIcon' : 'HideIcon'}
        onIconClick={() => setIsHidden(!isHidden)}
        value={value}
        placeholder={placeholder}
        error={error}
        errorText={errorText}
        onChange={onChange}
        {...rest}
      />
    );
  });

export default InputPassword;
