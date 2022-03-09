import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onRequestClose: (e?: React.SyntheticEvent) => void;
};

const ModalOverlay: React.FC<TModalOverlayProps> = ({
  onRequestClose
}) => (
  <div
    data-test="modal-overlay"
    className={modalOverlayStyles['overlay']}
    onClick={onRequestClose}
  />
);

export default ModalOverlay;
