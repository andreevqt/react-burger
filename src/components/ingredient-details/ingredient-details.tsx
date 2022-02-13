import React from 'react';
import classNames from 'classnames';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { TIngredient } from '../../types/ingredients';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
  withinModal?: boolean;
};

const IngredientDetails: React.FC<TIngredientDetailsProps> = ({
  ingredient,
  withinModal = false,
}) => {
  const {
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
    image_large,
  } = ingredient;

  const titleClasses = classNames(
    ingredientDetailsStyles['title'],
    'text text_type_main-large pr-7',
    {
      'mr-auto': withinModal
    }
  );

  return (
    <>
      <h5 className={titleClasses}>
        Детали ингредиента
      </h5>
      <img src={image_large} alt={name} />
      <h5 className={classNames(ingredientDetailsStyles['name'], 'mt-4 mb-8 text text_type_main-medium')}>
        {name}
      </h5>
      <div className={ingredientDetailsStyles['properties']}>
        <div className={classNames(ingredientDetailsStyles['property'], 'pr-5')}>
          <span className={classNames(ingredientDetailsStyles['property-label'], 'text text_type_main-small text_color_inactive')}>
            Калорий,ккал
          </span>
          <span className={classNames(ingredientDetailsStyles['property-value'], 'text text_type_digits-default text_color_inactive')}>
            {calories}
          </span>
        </div>
        <div className={classNames(ingredientDetailsStyles['property'], 'pr-5')}>
          <span className={classNames(ingredientDetailsStyles['property-label'], 'text text_type_main-small text_color_inactive')}>
            Белки,г
          </span>
          <span className={classNames(ingredientDetailsStyles['property-value'], 'text text_type_digits-default text_color_inactive')}>
            {proteins}
          </span>
        </div>
        <div className={classNames(ingredientDetailsStyles['property'], 'pr-5')}>
          <span className={classNames(ingredientDetailsStyles['property-label'], 'text text_type_main-small text_color_inactive')}>
            Жиры,г
          </span>
          <span className={classNames(ingredientDetailsStyles['property-value'], 'text text_type_digits-default text_color_inactive')}>
            {fat}
          </span>
        </div>
        <div className={`${ingredientDetailsStyles['property']}`}>
          <span className={classNames(ingredientDetailsStyles['property-label'], 'text text_type_main-small text_color_inactive')}>
            Углеводы,г
          </span>
          <span className={classNames(ingredientDetailsStyles['property-value'], 'text text_type_digits-default text_color_inactive')}>
            {carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
