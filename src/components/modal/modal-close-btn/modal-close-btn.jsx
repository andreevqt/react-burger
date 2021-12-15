import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import modalCloseBtnStyles from './modal-close-btn.module.css';

const ModalCloseBtn = ({
  className,
  onClick,
}) => (
  <button
    className={classNames(modalCloseBtnStyles['btn'], className)}
    type="button"
    onClick={onClick}
  >
    <CloseIcon />
  </button>
);

ModalCloseBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

ModalCloseBtn.defaultProps = {
  className: '',
};

export default ModalCloseBtn;
