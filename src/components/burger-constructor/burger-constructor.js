import React, {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import CustomScroll from '../custom-scroll/custom-scroll';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import AppContext from '../../services/context/app';
import shuffle from '../../utils/shuffle';
import random from '../../utils/random';
import {API_SERVER_URL} from '../../constants';

const BurgerConstructor = () => {
  const {state, dispatch} = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);

  const {bun, rest, totalPrice} = useMemo(() => {
    const shuffled = shuffle([...state.ingredients]);
    const bun = shuffled.find(item => item.type === 'bun');
    const rest = shuffled.filter(item => item.type !== 'bun').slice(0, random(1, shuffled.length));
    const totalPrice = rest.reduce((acc, item) => acc + item.price, bun ? bun.price * 2 : 0);
    return {bun, rest, totalPrice};
  }, [state.ingredients.length]);

  useEffect(() => {
    rest.forEach((item) => dispatch({type: 'add', payload: item}));
  }, [rest, dispatch]);

  useEffect(() => {
    if (bun) {
      dispatch({type: 'add', payload: {...bun, count: 2}});
    }
  }, [bun, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOrderClick = () => {
    const ingredients = [...rest.map((item) => item._id), bun._id];
    fetch(`${API_SERVER_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients})
    }).then((response) => response.json())
      .then(({success, order, message}) => {
        dispatch({type: 'clear-error'});
        if (!success) {
          return new Error(message);
        }
        setOrderId(order.number);
        setIsOpen(true);
      }).catch((err) => dispatch({type: 'set-error', payload: err.message}));
  };

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
              key={`${item._id}-${idx}`}
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
          onClick={handleOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
      {
        isOpen && (
          <Modal
            className="pt-30 pr-25 pb-30 pl-25"
            onRequestClose={() => setIsOpen(false)}
          >
            <OrderDetails
              orderId={orderId}
              status="Ваш заказ начали готовить"
            />
          </Modal>
        )
      }
    </div>
  );
};

export default BurgerConstructor;
