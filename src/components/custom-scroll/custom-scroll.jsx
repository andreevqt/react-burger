import React, { useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import scrollStyles from './custom-scroll.module.css';
import isOverflown from '../../utils/is-overflown';

const CustomScroll = ({
  className,
  children,
  threshold,
  onScroll,
  grow,
}) => {
  const container = useRef(null);

  const adjustHeight = useCallback(() => {
    const el = container.current;
    const rect = el.getBoundingClientRect();

    const height = `${window.innerHeight - rect.top - threshold}px`;
    el.style.height = grow ? height : el.style.height;

    if (isOverflown(el)) {
      el.classList.add('pr-2');
      el.classList.remove('pr-4');
      return;
    }
    el.classList.remove('pr-2');
    el.classList.add('pr-4');
  }, [threshold, grow]);

  useEffect(() => {
    const onElementScroll = () => {
      onScroll(container.current);
    };

    const el = container.current;
    window.addEventListener('resize', adjustHeight);
    el.addEventListener('scroll', onElementScroll);

    return () => {
      window.removeEventListener('resize', adjustHeight);
      el.removeEventListener('scroll', onElementScroll);
    };
  }, [adjustHeight, onScroll]);

  useEffect(() => {
    adjustHeight();
  }, [children, adjustHeight]);

  return (
    <div
      className={classNames(scrollStyles.scroll, 'custom-scroll', className)}
      ref={container}
    >
      {children}
    </div>
  );
};

CustomScroll.propTypes = {
  className: PropTypes.string,
  threshold: PropTypes.number,
  onScroll: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  grow: PropTypes.bool,
};

CustomScroll.defaultProps = {
  className: '',
  threshold: 40,
  onScroll: () => null,
  grow: false,
};

export default CustomScroll;
