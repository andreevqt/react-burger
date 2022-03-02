import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import BunDropzone from './bun-dropzone/bun-dropzone';
import IngredientsDropzone from './ingredients-dropzone/ingredients-dropzone';
import { decrement, increment } from '../../services/actions/ingredients';
import Buttons from './buttons/buttons';
import { addItem, deleteItem, swapItems } from '../../services/actions/burger-constructor';
import { submitOrder, clearOrder } from '../../services/actions/order';
import useAuth from '../../hooks/use-auth';
import { TIngredient } from '../../services/api';

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const {
    order,
    items,
    bun,
    isLoading,
  } = useSelector((store: any) => ({
    order: store.order.order,
    isLoading: store.order.isLoading,
    items: store.burgerConstructor.items,
    bun: store.burgerConstructor.bun,
  }));

  const totalPrice = useMemo(() => (
    items
      .reduce((acc: number, item: TIngredient) => acc + item.price, bun ? bun.price * 2 : 0)
  ), [items, bun]);

  const onItemAdd = (item: TIngredient) => {
    dispatch(addItem(item));
    if (item.type === 'bun' && bun) {
      dispatch(decrement(bun._id));
    }
    dispatch(increment(item._id));
  };

  const onSubmit = () => {
    if (!user) {
      history.replace({ pathname: '/login', state: { from: location } });
      return;
    }

    dispatch(submitOrder());
  };

  const onRequestClose = () => dispatch(clearOrder());

  const onDelete = (item: TIngredient, idx: number) => {
    if (window.confirm('Действительно хотите удалить?')) {
      dispatch(deleteItem(idx));
      dispatch(decrement(item._id));
    }
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => dispatch(swapItems(dragIndex, hoverIndex));
  const canOrder = items.length > 0 && !!bun;

  return (
    <div className="pt-25">
      <BunDropzone
        type="top"
        bun={bun}
        onDrop={onItemAdd}
      />
      <IngredientsDropzone
        items={items}
        onDrop={onItemAdd}
        onItemDelete={onDelete}
        moveItem={moveItem}
      />
      <BunDropzone
        type="bottom"
        bun={bun}
        onDrop={onItemAdd}
      />
      <Buttons
        totalPrice={totalPrice}
        isLoading={isLoading}
        onSubmit={onSubmit}
        canOrder={canOrder}
      />
      {order && order.id && (
        <Modal
          className="pt-30 pr-25 pb-30 pl-25"
          onRequestClose={onRequestClose}
        >
          <OrderDetails
            orderId={order.id}
            status="Ваш заказ начали готовить"
          />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
