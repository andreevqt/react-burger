const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}) => (scrollHeight > clientHeight) || (scrollWidth > clientWidth);

export default isOverflown;
