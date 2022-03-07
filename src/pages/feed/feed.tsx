import React, { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Base from '../../components/layout/base/base';
import Col from '../../components/grid/col/col';
import Row from '../../components/grid/row/row';
import OrderCard from '../../components/order-card/order-card';
import useFeed from '../../hooks/use-feed';
import CustomScroll from '../../components/custom-scroll/custom-scroll';
import DynamicCol from '../../components/dynamic-col/dynamic-col';

const Feed: React.FC = () => {
  const { init, close, orders, total, totalToday } = useFeed();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    init();
    return () => {
      close();
    };
  }, []);

  const done = useMemo(() => orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number), [orders]);
  const preparing = useMemo(() => orders
    .filter((order) => order.status !== 'done')
    .map((order) => order.number), [orders]);

  const onOrderClick = (number: number) => () => {
    history.push({
      pathname: `/feed/${number}`,
      state: { background: location }
    });
  };

  return (
    <Base>
      <h5 className="text text_type_main-large mb-6 mt-10">
        Лента заказов
      </h5>
      <Row>
        <Col mod="6" >
          <CustomScroll grow threshold={20}>
            {
              orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onClick={onOrderClick(order.number)}
                />
              ))
            }
          </CustomScroll>
        </Col>
        <Col mod="6" className="pl-10">
          <Row className="mb-15">
            <Col mod="6">
              <DynamicCol label="Готовы:" items={done} done />
            </Col>
            <Col mod="6">
              <DynamicCol label="В работе:" items={preparing} />
            </Col>
          </Row>
          <h5 className="text text_type_main-medium">Выполнено за все время:</h5>
          <div className="text text_glowing text_type_digits-large mb-15">{total}</div>
          <h5 className="text text_type_main-medium">Выполнено за сегодня:</h5>
          <div className="text text_glowing text_type_digits-large">{totalToday}</div>
        </Col>
      </Row>
    </Base>
  );
};

export default Feed;
