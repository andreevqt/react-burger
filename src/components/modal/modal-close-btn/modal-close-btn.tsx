import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import modalCloseBtnStyles from './modal-close-btn.module.css';

type TModalCloseBtnProps = {
  className?: string;
  onClick: (e: React.SyntheticEvent) => void;
};

const ModalCloseBtn: React.FC<TModalCloseBtnProps> = ({
  className,
  onClick,
}) => (
  <button
    className={classNames(modalCloseBtnStyles['btn'], className)}
    type="button"
    onClick={onClick}
  >
    <CloseIcon type="primary" />
  </button>
);

export default ModalCloseBtn;
