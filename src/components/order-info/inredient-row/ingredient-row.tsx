import React from 'react';
import classNames from 'classnames';
import { TIngredient } from '../../../services/api';
import IngredientPreview from '../../inredient-preview/ingredient-preview';
import ingredientRowStyles from './ingredient-row.module.css';
import TotalPrice from '../../total-price/total-price';

type TIngredientRowProps = {
  ingredient: TIngredient;
};

const IngredientRow: React.FC<TIngredientRowProps> = ({
  ingredient
}) => {
  const rowClasses = classNames(ingredientRowStyles['row'], 'mb-4');
  const amount = `${ingredient.count} x ${ingredient.price}`;

  return (
    <div className={rowClasses}>
      <IngredientPreview
        className="mr-4"
        name={ingredient.name}
        image={ingredient.image_mobile}
      />
      <h5 className="text text_type_main-default">
        {ingredient.name}
      </h5>
      <TotalPrice amount={amount} className="ml-auto" />
    </div>
  );
};

export default IngredientRow;
