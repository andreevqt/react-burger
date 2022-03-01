import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { KEY_ESC } from '../../constants';
import ModalCloseBtn from './modal-close-btn/modal-close-btn';
import ModalOverlay from './modal-overlay/modal-overlay';

const BODY_CLASS = 'modal-is-shown';

type TModalProps = {
  className?: string;
  onRequestClose: (e?: React.SyntheticEvent) => void;
};

const Modal: React.FC<TModalProps> = ({
  className,
  children,
  onRequestClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(document.querySelector('#modals'));

  useEffect(() => {
    document.body.classList.add(BODY_CLASS);
    return () => {
      document.body.classList.remove(BODY_CLASS);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KEY_ESC) {
        e.stopPropagation();
        onRequestClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose]);

  return containerRef.current ? ReactDOM.createPortal(
    (
      <div className={modalStyles['modal']}>
        <ModalOverlay onRequestClose={onRequestClose} />
        <div className={`${modalStyles['content']} ${className}`}>
          <ModalCloseBtn onClick={onRequestClose} />
          {children}
        </div>
      </div>
    ),
    containerRef.current,
  ) : null;
};

export default Modal;
