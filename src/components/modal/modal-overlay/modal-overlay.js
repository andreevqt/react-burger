import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({
  onRequestClose
}) => {
  return (
    <div
      className={modalOverlayStyles['overlay']}
      onClick={onRequestClose}
    />
  );
};

ModalOverlay.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
