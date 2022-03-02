import React, { useMemo } from 'react';
import classNames from 'classnames';
import { TOrder } from '../../services/api';
import useIngredients from '../../hooks/use-ingredients';
import IngredientRow from './inredient-row/ingredient-row';
import CustomScroll from '../custom-scroll/custom-scroll';
import TotalPrice from '../total-price/total-price';
import Status from '../status/status';
import orderInfoStyles from './order-info.module.css';
import formatTime from '../../utils/format-time';

type TOrderInfoProps = {
  order: TOrder;
  withinModal?: boolean;
};

const OrderInfo: React.FC<TOrderInfoProps> = ({
  order,
  withinModal = false
}) => {
  const { ingredients, collect, calculateAmount } = useIngredients();

  const ingredientsToRender = useMemo(
    () => collect(order.ingredients),
    [order.ingredients, ingredients, collect]
  );

  const date = useMemo(
    () => formatTime(order.createdAt),
    [order.createdAt]
  );

  const amount = useMemo(
    () => calculateAmount(ingredientsToRender),
    [ingredientsToRender, calculateAmount]
  );

  const idClasses = classNames('text text_type_digits-default', { 'tac': !withinModal })
  const metaClasses = classNames(orderInfoStyles['meta'], 'mt-10 mb-10');

  return (
    <div>
      <div className={idClasses}>
        #{order.number}
      </div>
      <h4 className="text text text_type_main-medium mt-10 mb-3">
        {order.name}
      </h4>
      <Status
        status={order.status}
        className="mb-15"
      />
      <h4 className="text text text_type_main-medium mb-6">
        Состав:
      </h4>
      <CustomScroll className={orderInfoStyles['scroll']}>
        {
          ingredientsToRender.map((ingredient) => ingredient && (
            <IngredientRow
              key={ingredient._id}
              ingredient={ingredient}
            />)
          )
        }
      </CustomScroll>
      <div className={metaClasses}>
        <span className="text text_type_main-default text_color_inactive">{date}</span>
        <TotalPrice amount={amount.toString()} />
      </div>
    </div>
  );
};

export default OrderInfo;
