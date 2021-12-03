import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import CustomScroll from '../custom-scroll/custom-scroll';
import {dataProptypes} from '../../utils/data';
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({items}) => {
  const {bun, rest, totalPrice} = useMemo(() => {
    const bun = items.find(item => item.type === 'bun');
    const rest = items.filter(item => item.type !== 'bun');
    const totalPrice = rest.reduce((acc, item) => acc + item.price, bun ? bun.price * 2 : 0);
    return {bun, rest, totalPrice};
  }, [items]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-25">
      {
        bun && (
          <div className={`${burgerConstructorStyles['item']} pl-12 pr-6 mb-4`}>
            <ConstructorElement
              thumbnail={bun.image}
              price={bun.price}
              text={`${bun.name} (верх)`}
              type="top"
              isLocked={true}
            />
          </div>
        )
      }
      <CustomScroll
        className="pl-4 pr-4"
        scrollToCount={4}
      >
        {
          rest.map((item, idx) => (
            <div
              className={`${burgerConstructorStyles['item']} ${idx < rest.length - 1 ? 'mb-4' : ''}`}
              key={item._id}
            >
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
        bun && (
          <div className={`${burgerConstructorStyles['item']} pl-12 pr-6 mt-4`}>
            <ConstructorElement
              thumbnail={bun.image}
              price={bun.price}
              text={`${bun.name} (низ)`}
              type="bottom"
              isLocked={true}
            />
          </div>
        )
      }
      <div className={`${burgerConstructorStyles['buttons']} mt-10`}>
        <div className={`${burgerConstructorStyles['price']} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
          <CurrencyIcon />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      <OrderDetails
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        orderId="034536"
        status="Ваш заказ начали готовить"
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(dataProptypes).isRequired
};

export default BurgerConstructor;
