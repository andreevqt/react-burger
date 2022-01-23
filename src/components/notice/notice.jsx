import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import noticeStyles from './notice.module.css';

const Notice = ({
  text,
  onClose
}) => (
  <div className={noticeStyles['notice']}>
    <span className="text text_type_main-default">{text}</span>
    <button
      className={noticeStyles['close']}
      type="button"
      onClick={onClose}
    >
      <CloseIcon />
    </button>
  </div>
);

Notice.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func
};

export default Notice;
