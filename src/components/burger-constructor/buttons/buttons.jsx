import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import buttonsStyles from './buttons.module.css';

const Buttons = ({
  totalPrice,
  onSubmit,
  canOrder,
  isLoading,
}) => (
  <div className={classNames(buttonsStyles['buttons'], 'mt-10 pr-4')}>
    <div className={classNames(buttonsStyles['price'], 'mr-10')}>
      <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
      <CurrencyIcon />
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

Buttons.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  canOrder: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Buttons;
