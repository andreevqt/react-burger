import React, { SyntheticEvent } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import buttonsStyles from './buttons.module.css';
import TotalPrice from '../../total-price/total-price';

type TButtonsProps = {
  totalPrice: string;
  onSubmit: (() => void) | ((e: SyntheticEvent) => void);
  canOrder: boolean;
  isLoading: boolean;
};

const Buttons: React.FC<TButtonsProps> = ({
  totalPrice,
  onSubmit,
  canOrder,
  isLoading,
}) => (
  <div className={classNames(buttonsStyles['buttons'], 'mt-10 pr-4')}>
    <TotalPrice amount={totalPrice} className="mr-10" type="medium" />
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
