import React from 'react';
import classNames from 'classnames';
import { TOrderStatus } from '../../services/api'

type TStatusProps = {
  status: TOrderStatus;
  className?: string;
};

const Status: React.FC<TStatusProps> = ({
  status,
  className
}) => {
  const classes = classNames('text text_type_main-default', className);

  return (
    <div className={classes}>
      {
        status === 'done'
          ? (
            <span className='text_color_success'>
              Выполнен
            </span>
          )
          : status === 'pending'
            ? (
              <span className='text_color_success'>
                Готовится
              </span>
            )
            : (
              <span className='text_color_success'>
                Создан
              </span>
            )
      }
    </div>
  );
};

export default Status;
