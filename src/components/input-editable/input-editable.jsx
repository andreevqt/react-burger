import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const InputEditable = ({
  type,
  placeholder,
  onBlur,
  onDelete,
  ...rest
}) => {
  const ref = useRef(null);
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

  const handleBlur = (e) => {
    setIsEditable(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  useEffect(() => {
    if (isEditable) {
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
      {...rest}
    />
  );
};

InputEditable.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func
};

InputEditable.defaultProps = {
  type: 'text'
};

export default InputEditable;
