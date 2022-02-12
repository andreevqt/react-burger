import React, { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const InputEditable: React.FC<{
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e?: React.SyntheticEvent) => void;
  onDelete: () => void;
  value: string;
  error?: boolean;
  errorText?: string;
}> = ({
  type = 'text',
  placeholder,
  onBlur,
  onDelete,
  value,
  onChange,
  error,
  errorText,
  ...rest
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditable, setIsEditable] = useState(false);

    const onIconClick = () => {
      // Не срабаотывает onClick, потому что срабатывает blur
      // если input в фокусе и кликнут элемент за переделами input
      if (isEditable && onDelete) {
        onDelete();
        return;
      }

      setIsEditable(!isEditable);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsEditable(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    useEffect(() => {
      if (isEditable && ref.current) {
        ref.current.focus();
      }
    }, [isEditable]);

    return (
      <Input
        ref={ref}
        onBlur={handleBlur}
        placeholder={placeholder}
        type={type}
        disabled={!isEditable}
        icon={!isEditable ? 'EditIcon' : 'CloseIcon'}
        onIconClick={onIconClick}
        onChange={onChange}
        value={value}
        error={error}
        errorText={errorText}
        {...rest}
      />
    );
  };

export default InputEditable;
