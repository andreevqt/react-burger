import React from 'react';
import PropTypes from 'prop-types';
import PageLoader from '../page-loader/page-loader';

const WithLoader = ({ isLoading, children }) => (
  isLoading
    ? <PageLoader />
    : children
);

WithLoader.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool
};

WithLoader.defaultProps = {
  isLoading: false
};

export default WithLoader;
