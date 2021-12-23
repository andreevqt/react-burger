import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import BunDropzone from './bun-dropzone/bun-dropzone';
import IngredientsDropzone from './ingredients-dropzone/ingredients-dropzone';
import { decrement, increment } from '../../services/actions/ingredients';
import Buttons from './buttons/buttons';
import { addItem, deleteItem, swapItems } from '../../services/actions/burger-constructor';
import { submitOrder, clearOrder } from '../../services/actions/order';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const {
    order,
    items,
    bun,
    isLoading,
  } = useSelector((store) => ({
    order: store.order.order,
    isLoading: store.order.isLoading,
    items: store.burgerConstructor.items,
    bun: store.burgerConstructor.bun,
  }));

  const totalPrice = useMemo(() => (
    items
      .reduce((acc, item) => acc + item.price, bun ? bun.price * 2 : 0)
  ), [items, bun]);

  // const [isOpen, setIsOpen] = useState(false);

  const onItemAdd = (item) => {
    dispatch(addItem(item));
    if (item.type === 'bun' && bun) {
      dispatch(decrement(bun._id));
    }
    dispatch(increment(item._id));
  };

  const onSubmit = () => dispatch(submitOrder());
  const onRequestClose = () => dispatch(clearOrder());

  const onDelete = (item, idx) => {
    if (window.confirm('Действительно хотите удалить?')) {
      dispatch(deleteItem(idx));
      dispatch(decrement(item._id));
    }
  };

  const moveItem = (dragIndex, hoverIndex) => dispatch(swapItems(dragIndex, hoverIndex));
  const canOrder = items.length > 0 && !!bun;

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};

export default BurgerConstructor;
