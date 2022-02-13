const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) => (scrollHeight > clientHeight) || (scrollWidth > clientWidth);

export default isOverflown;
