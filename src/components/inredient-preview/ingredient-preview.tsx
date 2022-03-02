import React from 'react';
import classNames from 'classnames';
import ingredientPreviewStyles from './ingredient-preview.module.css';

type TIngredientPreviewProps = {
  name: string;
  image: string;
  style?: object;
  className?: string;
};

const IngredientPreview: React.FC<TIngredientPreviewProps> = ({
  name,
  image,
  style,
  className,
  children
}) => {
  const classes = classNames(ingredientPreviewStyles['image-gradient'], className);
  
  return (
    <div
      className={classes}
      style={style}
    >
      <div className={ingredientPreviewStyles['image-wrapper']} >
        <img
          src={image}
          className={ingredientPreviewStyles['image']}
          alt={name}
        />
        {children}
      </div>
    </div>
  );
};

export default IngredientPreview;
