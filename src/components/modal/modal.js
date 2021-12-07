import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import {KEY_ESC} from '../../constants';
import PropTypes from 'prop-types';
import ModalCloseBtn from './modal-close-btn/modal-close-btn';
import ModalOverlay from './modal-overlay/modal-overlay';

const BODY_CLASS = 'modal-is-shown';

const Modal = ({
  className = '',
  children,
  onRequestClose
}) => {
  const containerRef = useRef(document.createElement('div'));

  useEffect(() => {
    const container = containerRef.current;
    document.body.appendChild(container);
    document.body.classList.add(BODY_CLASS);
    return () => {
      document.body.removeChild(container);
      document.body.classList.remove(BODY_CLASS);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === KEY_ESC) {
        e.stopPropagation();
        onRequestClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose]);

  return ReactDOM.createPortal((
    <div className={modalStyles['modal']}>
      <ModalOverlay onRequestClose={onRequestClose} />
      <div className={`${modalStyles['content']} ${className}`}>
        <ModalCloseBtn onClick={onRequestClose} />
        {children}
      </div>
    </div>
  ),
    containerRef.current
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Modal;
