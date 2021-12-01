import React from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import CustomScroll from '../custom-scroll/custom-scroll';
import {dataProptypes} from '../../utils/data';

const BurgerConstructor = ({items}) => {
  const bun = items.find(item => item.type === 'bun');
  const rest = items.filter(item => item.type !== 'bun');
  const totalPrice = rest.reduce((acc, item) => acc + item.price, bun ? bun.price * 2 : 0);

  return (
    <div className="pt-25">
      {
        bun &&
        <div className={`${burgerConstructorStyles['item']} pl-12 pr-6 mb-4`}>
          <ConstructorElement thumbnail={bun.image} price={bun.price} text={`${bun.name} (верх)`} type="top" isLocked={true} />
        </div>
      }
      <CustomScroll scrollToCount={4} className="pl-4 pr-4">
        {
          rest.map((item, idx) => (
            <div key={item._id} className={`${burgerConstructorStyles['item']} ${idx < rest.length - 1 ? 'mb-4' : ''}`}>
              <DragIcon />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))
        }
      </CustomScroll>
      {
        bun &&
        <div className={`${burgerConstructorStyles['item']} pl-12 pr-6 mt-4`}>
          <ConstructorElement thumbnail={bun.image} price={bun.price} text={`${bun.name} (низ)`} type="bottom" isLocked={true} />
        </div>
      }
      <div className={`${burgerConstructorStyles['buttons']} mt-10`}>
        <div className={`${burgerConstructorStyles['price']} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(dataProptypes)
}

export default BurgerConstructor;
