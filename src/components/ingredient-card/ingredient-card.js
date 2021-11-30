import React from "react";
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({image, name, price, count}) => {
  return (
    <div className={ingredientCardStyles['card']}>
      <div className={`${ingredientCardStyles['header']} pl-4 pr-4`}>
        <img className={ingredientCardStyles['image']} src={image} alt={name} />
        {count && <Counter count={1} size="default" />}
      </div>
      <div className={ingredientCardStyles['body']}>
        <div className={`${ingredientCardStyles['price']} mt-1 mb-1`}>
          <span className="text_type_digits-default">{price}</span>
          <CurrencyIcon />
        </div>
        <h5 className={`${ingredientCardStyles['title']} text_type_main-default`}>{name}</h5>
      </div>
    </div>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number
}

export default IngredientCard;
