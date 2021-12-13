import React from 'react';
import orderDetailsStyles from './order-details.module.css';
import PropTypes from 'prop-types';
import img from '../../images/order-completed.svg';

const OrderDetails = ({
  orderId,
  status
}) => {
  return (
    <>
      <span className={`${orderDetailsStyles['id']} text text_type_digits-large`} >
        {orderId}
      </span>
      <h5 className={`${orderDetailsStyles['title']} text text_type_main-medium mt-8 mb-15`}>
        идентификатор заказа
      </h5>
      <img className="mb-15" src={img} alt="Заказ готовится/готов" />
      <h6 className={`${orderDetailsStyles['status']} text text_type_main-default mb-2`}>
        {status}
      </h6>
      <p className={`${orderDetailsStyles['description']} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderDetails;
