import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import skeletonStyles from './skeleton.module.css';

const Skeleton = ({
  variant,
  width,
  height,
  className,
}) => {
  const classes = classNames(skeletonStyles['skeleton'], {
    [skeletonStyles['text']]: variant === 'text',
    [skeletonStyles['rounded']]: variant === 'rounded',
    [skeletonStyles['rectangular']]: variant === 'rectangular',
  }, className);

  const styles = {
    width,
    height,
  };

  return <div className={classes} style={styles} />;
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['rectangular', 'rounded', 'text']),
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Skeleton.defaultProps = {
  variant: 'rectangular',
  className: '',
  width: '100%',
  height: 'auto',
};

export default Skeleton;
