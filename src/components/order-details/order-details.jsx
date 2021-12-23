import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import img from '../../images/order-completed.svg';

const OrderDetails = ({
  orderId,
  status,
}) => (
  <>
    <span className={classNames(orderDetailsStyles['id'], 'text text_type_digits-large')}>
      {orderId}
    </span>
    <h5 className={classNames(orderDetailsStyles['title'], 'text text_type_main-medium mt-8 mb-15')}>
      идентификатор заказа
    </h5>
    <img className="mb-15" src={img} alt="Заказ готовится/готов" />
    <h6 className={classNames(orderDetailsStyles['status'], 'text text_type_main-default mb-2')}>
      {status}
    </h6>
    <p className={classNames(orderDetailsStyles['description'], 'text text_type_main-default text_color_inactive')}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderDetails;
