import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ingredientsDropzoneStyles from './ingredients-dropzone.module.css';
import CustomScroll from '../../custom-scroll/custom-scroll';
import SortableIngredient from './sortable-ingredient/sortable-ingredient';
import { dataProptypes } from '../../../utils/data';

const IngredientsDropzone = ({
  items,
  onDrop,
  onItemDelete,
  moveItem,
}) => {
  const [{ canDrop }, ref] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
    drop: onDrop,
  });

  return (
    <div className={classNames(ingredientsDropzoneStyles['wrapper'], 'mt-4', 'mb-4')} ref={ref}>
      <CustomScroll className={classNames(ingredientsDropzoneStyles['scroll'], 'pl-4')}>
        {(items.length > 0) ? items.map((item, index) => (
          <SortableIngredient
            key={item.id}
            className={classNames({ 'mb-4': index < items.length - 1 })}
            ingredient={item}
            index={index}
            onDelete={() => onItemDelete(item, index)}
            moveItem={moveItem}
          />
        )) : (
          <div className={classNames(ingredientsDropzoneStyles['placeholder'], 'ml-8')}>
            {!canDrop && <span className="text text_type_main-default">Место для ингредиентов</span>}
          </div>
        )}
      </CustomScroll>
      {canDrop && (
        <div className={`${ingredientsDropzoneStyles['overlay']}`}>
          <span className={classNames('text', 'text_type_main-medium', ingredientsDropzoneStyles['overlay-title'])}>Перетащите ингредиенты</span>
        </div>
      )}
    </div>
  );
};

IngredientsDropzone.propTypes = {
  items: PropTypes.arrayOf(dataProptypes).isRequired,
  onDrop: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
};

export default IngredientsDropzone;
