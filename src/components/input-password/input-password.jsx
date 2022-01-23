import React, { useState, forwardRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const InputPassword = forwardRef((props, ref) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <Input
      ref={ref}
      type={isHidden ? 'password' : 'text'}
      icon={isHidden ? 'ShowIcon' : 'HideIcon'}
      onIconClick={() => setIsHidden(!isHidden)}
      {...props}
    />
  );
});

export default InputPassword;
