import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Base from '../../components/layout/base/base';
import Row from '../../components/grid/row/row';
import Col from '../../components/grid/col/col';
import NoMatch from '../no-match/no-match';
import useOrderInfo from '../../hooks/use-order-info';
import OrderInfo from '../../components/order-info/order-info';

const Order: React.FC = () => {
  const { get, order, isPending, clear } = useOrderInfo();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    get(+id);

    return () => {
      clear();
    };
  }, []);

  const notFound = !isPending && !order;
  if (notFound) {
    return <NoMatch />;
  }

  if (!order) {
    return null;
  }

  return (
    <Base>
      <Row>
        <Col mod="6" align="center" className="pt-20">
          <OrderInfo order={order} />
        </Col>
      </Row>
    </Base>
  );
};

export default Order;
