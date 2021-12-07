import React from 'react';
import modalCloseBtnStyles from './modal-close-btn.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const ModalCloseBtn = ({
  className = '',
  onClick,
  ...rest
}) => {
  return (
    <button
      className={`${modalCloseBtnStyles['btn']} ${className}`}
      type="button"
      onClick={onClick}
      {...rest}
    >
      <CloseIcon />
    </button>
  );
};

ModalCloseBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default ModalCloseBtn;
