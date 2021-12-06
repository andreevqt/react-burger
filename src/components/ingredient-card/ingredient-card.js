import React from "react";
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({
  image,
  name,
  price,
  count,
  onClick
}) => {
  return (
    <div className={ingredientCardStyles['card']} onClick={onClick}>
      <div className="pl-4 pr-4">
        <img className={ingredientCardStyles['image']} src={image} alt={name} />
        {count && <Counter count={count} size="default" />}
      </div>
      <div className={`${ingredientCardStyles['price']} mt-1 mb-1`}>
        <span className="text_type_digits-default">{price}</span>
        <CurrencyIcon />
      </div>
      <h5 className={`${ingredientCardStyles['title']} text_type_main-default`}>{name}</h5>
    </div>
  );
};

IngredientCard.propTypes = {
  count: PropTypes.number,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default IngredientCard;
