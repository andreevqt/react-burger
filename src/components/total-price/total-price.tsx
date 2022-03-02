import React from 'react';
import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import totalPriceStyles from './total-price.module.css';

type TTotalPriceProps = {
  amount: string;
  className?: string;
  type?: 'medium' | 'default';
};

const TotalPrice: React.FC<TTotalPriceProps> = ({ amount, className, type = 'default' }) => {
  const amountClasses = classNames(
    'text mr-2',
    {
      ['text_type_digits-medium']: type === 'medium',
      ['text_type_digits-default']: type === 'default'
    }
  );

  return (
    <div className={classNames(totalPriceStyles['price'], className)}>
      <span className={amountClasses}>{amount}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
};

export default TotalPrice;
