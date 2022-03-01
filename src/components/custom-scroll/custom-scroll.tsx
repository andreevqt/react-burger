import React, { useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import scrollStyles from './custom-scroll.module.css';
import isOverflown from '../../utils/is-overflown';

type TCustomScrollProps = {
  className?: string;
  threshold?: number;
  onScroll?: ((container: HTMLDivElement | null) => void);
  grow?: boolean;
};

const CustomScroll: React.FC<TCustomScrollProps> = ({
  className,
  children,
  threshold = 40,
  onScroll,
  grow = false,
}) => {
  const container = useRef<HTMLDivElement>(null);

  const adjustHeight = useCallback(() => {
    const el = container.current;
    if (!el) {
      return;
    }

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
      if (onScroll) {
        onScroll(container.current);
      }
    };

    const el = container.current;
    if (el) {
      el.addEventListener('scroll', onElementScroll);
    }
    window.addEventListener('resize', adjustHeight);

    return () => {
      if (el) {
        el.removeEventListener('scroll', onElementScroll);
      }
      window.removeEventListener('resize', adjustHeight);
    };
  }, [adjustHeight, onScroll]);

  useEffect(() => {
    adjustHeight();
  }, [children, adjustHeight]);

  return (
    <div
      className={classNames(scrollStyles.scroll, 'custom-scroll pr-2', className)}
      ref={container}
    >
      {children}
    </div>
  );
};

export default CustomScroll;
