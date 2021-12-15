import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import sortableIngredientStyles from './sortable-ingredient.module.css';
import { dataProptypes } from '../../../../utils/data';

const SortableIngredient = ({
  className,
  ingredient,
  index,
  onDelete,
  moveItem,
}) => {
  const ref = useRef(null);
  const { name, price, image } = ingredient;

  const [, drag, preview] = useDrag({
    type: 'sortable-ingredient',
    item: { index, id: ingredient.id },
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'sortable-ingredient',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex; // eslint-disable-line
    },
  });

  drop(preview(ref));

  return (
    <div
      className={classNames(sortableIngredientStyles['item'], className)}
      ref={ref}
    >
      <div
        className={sortableIngredientStyles['handle']}
        ref={drag}
        data-handler-id={handlerId}
      >
        <DragIcon />
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={onDelete}
      />
    </div>
  );
};

SortableIngredient.propTypes = {
  className: PropTypes.string,
  ingredient: dataProptypes.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
};

SortableIngredient.defaultProps = {
  className: '',
};

export default SortableIngredient;
