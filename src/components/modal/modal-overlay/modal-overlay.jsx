import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({
  onRequestClose,
}) => (
  <div
    className={modalOverlayStyles['overlay']}
    onClick={onRequestClose}
  />
);

ModalOverlay.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
