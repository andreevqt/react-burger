import React, {useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import scrollStyles from './custom-scroll.module.css';

const CustomScroll = ({
  className = '',
  children,
  scrollToCount,
  threshold = 40,
  onScroll = () => null
}) => {
  const container = useRef(null);

  const adjustHeight = () => {
    let height;

    const el = container.current;
    const elRect = el.getBoundingClientRect();

    if (scrollToCount) {
      const kids = Array.from(el.children);
      if (kids.length > scrollToCount) {
        const kid = kids[scrollToCount - 1];
        const lastItemRect = kid.getBoundingClientRect();
        height = `${lastItemRect.top + lastItemRect.height - elRect.top}px`;
      }
      container.current.scrollTo(0, 0);
    } else {
      height = `${window.innerHeight - elRect.top - threshold}px`;
    }

    el.style.height = height || el.style.height;
  };

  const onElementScroll = (e) => {
    onScroll(container.current);
  };

  useEffect(() => {
    window.addEventListener('resize', adjustHeight);
    container.current.addEventListener('scroll', onElementScroll);

    return () => {
      window.removeEventListener('resize', adjustHeight);
      container.current.removeEventListener('scroll', onElementScroll);
    };
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [children]);

  // Дочерние элементы не помещаются целиком до scrollToCount из-за того что в ConstructorElement
  // нет placeholder'a картинки и не представляется возможным посчитать точно высоту
  // элемента пока изображение не загружено
  return (
    <div
      className={`custom-scroll ${scrollStyles.scroll} ${className}`}
      ref={container}
    >
      {children}
    </div>
  );
};

CustomScroll.propTypes = {
  className: PropTypes.string,
  scrollToCount: PropTypes.number,
  threshold: PropTypes.number,
  onScroll: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default CustomScroll;
