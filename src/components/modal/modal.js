import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {KEY_ESC} from '../../constants';
import PropTypes from 'prop-types';

const BODY_CLASS = 'modal-is-shown';

const ModalCloseBtn = ({
  className = '',
  onClick,
  ...rest
}) => {
  return (
    <button
      className={`${modalStyles['close-btn']} ${className}`}
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

const ModalPortal = ({
  className = '',
  children,
  isOpen,
  onRequestClose = () => null
}) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === KEY_ESC) {
      e.stopPropagation();
      onRequestClose();
    }
  };

  return isOpen ? (
    <div className={modalStyles['portal']}>
      <div
        className={modalStyles['overlay']}
        onClick={onRequestClose}
      >
        <div
          className={`${modalStyles['content']} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalCloseBtn onClick={onRequestClose} />
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

ModalPortal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

const createElement = (className) => {
  const el = document.createElement('div');
  el.classList.add(className);
  return el;
};

const Modal = ({
  children,
  isOpen = false,
  ...rest
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.appendChild(containerRef.current);
    return () => document.body.removeChild(containerRef.current);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(BODY_CLASS);
      return;
    }
    document.body.classList.remove(BODY_CLASS);
  }, [isOpen]);

  if (!containerRef.current) {
    containerRef.current = createElement('burger-modal-portal');
  }

  return containerRef.current ? ReactDOM.createPortal(
    <ModalPortal
      isOpen={isOpen}
      {...rest}
    >
      {children}
    </ModalPortal>,
    containerRef.current
  ) : null;
};

Modal.prototype = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  isOpen: PropTypes.bool
};

export {
  ModalCloseBtn,
  Modal
};
