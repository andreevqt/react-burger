import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import OrderCompletedIcon from '../icons/order-completed';
import {Modal} from '../modal/modal';
import PropTypes from 'prop-types';

const OrderDetails = ({
  onRequestClose,
  orderId,
  status,
  isOpen,
  ...rest
}) => {
  return (
    <Modal
      className={`${orderDetailsStyles['card']} pt-30 pr-25 pb-30 pl-25`}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      {...rest}
    >
      <span className={`${orderDetailsStyles['id']} text text_type_digits-large`} >
        {orderId}
      </span>
      <h5 className={`${orderDetailsStyles['title']} text text_type_main-medium mt-8 mb-15`}>
        идентификатор заказа
      </h5>
      <OrderCompletedIcon className="mb-15" />
      <h6 className={`${orderDetailsStyles['status']} text text_type_main-default mb-2`}>
        {status}
      </h6>
      <p className={`${orderDetailsStyles['description']} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
};

OrderDetails.propTypes = {
  onRequestClose: PropTypes.func,
  orderId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default OrderDetails;
