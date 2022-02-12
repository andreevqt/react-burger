import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay: React.FC<{
  onRequestClose: (e?: React.SyntheticEvent) => void;
}> = ({
  onRequestClose,
}) => (
    <div
      className={modalOverlayStyles['overlay']}
      onClick={onRequestClose}
    />
  );

export default ModalOverlay;
