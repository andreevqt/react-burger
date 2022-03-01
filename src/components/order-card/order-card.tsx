import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import orderCardStyles from './order-card.module.css';
import { TOrder } from '../../services/api';
import useIngredients from '../../hooks/use-ingredients';
import TotalPrice from '../total-price/total-price';
import IngredientPreview from '../inredient-preview/ingredient-preview';
import Status from '../status/status';
import formatTime from '../../utils/format-time';

type TOrderProps = {
  order: TOrder;
  onClick?: (e: React.SyntheticEvent) => void;
  showStatus?: boolean;
};

const OrderCard: React.FC<TOrderProps> = ({
  order,
  onClick,
  showStatus = false
}) => {
  const { ingredients, collect, calculateAmount } = useIngredients();

  const cardClasses = classNames(orderCardStyles['card'], 'p-6 mb-4');
  const dateClasses = classNames(orderCardStyles['date'], 'text text_type_main-default text_color_inactive');
  const moreClasses = classNames(orderCardStyles['more'], 'text text_type_digits-default');

  const { images, totalAmount } = useMemo(() => {
    const items = collect(order.ingredients);
    const totalAmount = calculateAmount(items);
    const sliced = items.slice(0, 6);
    const images = sliced.map((ingredient, index) => {
      const left = `${index * 48}px`;
      const zIndex = 6 - index;
      const isLast = index === sliced.length - 1;
      const diff = items.length - sliced.length;
      const style = {
        position: 'absolute',
        left,
        zIndex
      };

      return ingredient && (
        <IngredientPreview
          key={index}
          style={style}
          name={ingredient.name}
          image={ingredient.image}
        >
          {
            isLast && diff > 0 && (
              <div className={moreClasses}>+{diff}</div>
            )
          }
        </IngredientPreview>
      );
    });

    return {
      images,
      totalAmount
    };
  }, [ingredients]);

  const date = useMemo(() => formatTime(order.createdAt), [order.createdAt]);

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className={orderCardStyles['header']}>
        <div className="text text_type_digits-default">
          #{order.number}
        </div>
        <div className={dateClasses}>
          {date}
        </div>
      </div>
      <div className={orderCardStyles['body']}>
        <div className="mb-6">
          <h5 className="text text_type_main-medium mt-6">
            {order.name}
          </h5>
          {showStatus && (
            <Status
              status={order.status}
              className="mt-2"
            />
          )}
        </div>
        <div className={orderCardStyles['meta']}>
          <div className={orderCardStyles['images-stack']}>
            {images}
          </div>
          <TotalPrice amount={totalAmount.toString()} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
