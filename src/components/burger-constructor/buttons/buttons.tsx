import React, { SyntheticEvent } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import buttonsStyles from './buttons.module.css';

const Buttons: React.FC<{
  totalPrice: number;
  onSubmit: (() => void) | ((e: SyntheticEvent) => void);
  canOrder: boolean;
  isLoading: boolean;
}> = ({
  totalPrice,
  onSubmit,
  canOrder,
  isLoading,
}) => (
    <div className={classNames(buttonsStyles['buttons'], 'mt-10 pr-4')}>
      <div className={classNames(buttonsStyles['price'], 'mr-10')}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
      {canOrder && (
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          disabled={isLoading}
        >
          Оформить заказ
        </Button>
      )}
    </div>
  );

export default Buttons;
