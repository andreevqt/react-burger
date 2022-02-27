import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import ingredientCardStyles from './ingredient-card.module.css';
import { TIngredient } from '../../services/api';

type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick: (() => void) | ((e: React.SyntheticEvent) => void);
};

const IngredientCard: React.FC<TIngredientCardProps> = ({
  ingredient,
  onClick
}) => {
  const {
    name,
    price,
    count,
    image,
    type,
  } = ingredient;

  const [, ref] = useDrag({
    type: type === 'bun' ? 'bun' : 'ingredient',
    item: {
      ...ingredient,
      id: nanoid(),
    },
  });

  return (
    <div
      className={ingredientCardStyles['card']}
      onClick={onClick}
      ref={ref}
    >
      <div className="pl-4 pr-4">
        <img
          className={ingredientCardStyles['image']}
          src={image}
          alt={name}
        />
        {count && <Counter count={count} size="default" />}
      </div>
      <div className={classNames(ingredientCardStyles['price'], 'mt-1 mb-1')}>
        <span className="text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h5 className={classNames(ingredientCardStyles['title'], 'text_type_main-default')}>{name}</h5>
    </div>
  );
};

export default IngredientCard;
