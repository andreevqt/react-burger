import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ModalBase from '../../modal/modal';
import useOrderInfo from '../../../hooks/use-order-info';
import NoMatch from '../../../pages/no-match/no-match';
import OrderInfo from '../order-info';

type TModalProps = {
  redirectTo?: string;
};

const Modal: React.FC<TModalProps> = ({
  redirectTo = '/'
}) => {
  const { get, order, isPending, clear } = useOrderInfo();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

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

  const closeModal = () => history.replace({ pathname: redirectTo });

  return order ? (
    <ModalBase
      className="p-10"
      onRequestClose={closeModal}
    >
      <OrderInfo order={order} withinModal={true} />
    </ModalBase>
  ) : null;
};

export default Modal;
