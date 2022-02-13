import React from 'react';
import classNames from 'classnames';
import skeletonStyles from './skeleton.module.css';

type TSkeletonProps = {
  className?: string;
  variant?: 'text' | 'rounded' | 'rectangular';
  width?: string;
  height?: string;
};

const Skeleton: React.FC<TSkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 'auto',
  className,
}) => {
  const classes = classNames(skeletonStyles['skeleton'], {
    [skeletonStyles['text']]: variant === 'text',
    [skeletonStyles['rounded']]: variant === 'rounded',
    [skeletonStyles['rectangular']]: variant === 'rectangular',
  }, className);

  return <div className={classes} style={{ width, height }} />;
};

export default Skeleton;
