import React, { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import ProfileLayout from '../../components/layout/profile/profile';
import useOrderHistory from '../../hooks/use-order-history';
import OrderCard from '../../components/order-card/order-card';
import CustomScroll from '../../components/custom-scroll/custom-scroll';
import Seo from '../../components/seo/seo';

const History: React.FC = () => {
  const { orders, init, close } = useOrderHistory();

  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    init();

    return () => {
      close();
    };
  }, []);

  const onOrderClick = (number: number) => () => {
    history.push({
      pathname: `${path}/${number}`,
      state: { background: location }
    });
  };

  return (
    <ProfileLayout
      description="В этом разделе вы можете просмотреть свою историю заказов"
      content={
        <>
          <Seo title="История заказов"/>
          <CustomScroll className="mt-10" grow>
            {
              orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  showStatus
                  onClick={onOrderClick(order.number)}
                />
              ))
            }
          </CustomScroll>
        </>
      }
    />
  );
};

export default History;
