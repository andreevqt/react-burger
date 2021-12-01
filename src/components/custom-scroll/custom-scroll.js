import React, {useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import scrollStyles from './custom-scroll.module.css';

const CustomScroll = ({children, className = '', scrollToCount, threshold = 40}) => {
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
    } else {
      height = `${window.innerHeight - elRect.top - threshold}px`;
    }

    el.style.height = height || el.style.height;
  };

  useEffect(() => {
    window.addEventListener('resize', adjustHeight);
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [children]);

  // Дочерние элементы не помещаются целиком до scrollToCount из-за того что в ConstructorElement
  // нет placeholder'a картинки и не представляется возможным посчитать точно высоту
  // элемента пока изображение не загружено
  return (<div /* onLoad={adjustHeight} */ className={`custom-scroll ${scrollStyles.scroll} ${className}`} ref={container}>
    {children}
  </div>);
};

CustomScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  scrollToCount: PropTypes.number,
  threshold: PropTypes.number,
};

export default CustomScroll;
