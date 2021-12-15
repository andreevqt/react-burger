import React from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bunDropzoneStyles from './bun-dropzone.module.css';
import { dataProptypes } from '../../../utils/data';

const BunDropzone = ({
  type,
  bun,
  onDrop,
  className,
}) => {
  const [{ canDrop }, ref] = useDrop({
    accept: 'bun',
    drop: onDrop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className={classNames('pr-4', 'pl-12', bunDropzoneStyles['item'], className)}
      ref={ref}
    >
      {bun ? (
        <ConstructorElement
          thumbnail={bun.image}
          price={bun.price}
          text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
          type={type}
          isLocked
        />
      ) : (
        <div className={classNames('text', 'text_type_main-default', bunDropzoneStyles['placeholder'], bunDropzoneStyles[type])}>
          {!canDrop && 'Место для булки'}
        </div>
      )}
      {canDrop && (
        <div className={classNames(bunDropzoneStyles['overlay'], bunDropzoneStyles[type])}>
          <span className={classNames('text', 'text_type_main-medium', bunDropzoneStyles['overlay-title'])}>Перетащите булку</span>
        </div>
      )}
    </div>
  );
};

BunDropzone.propTypes = {
  type: PropTypes.string.isRequired,
  bun: dataProptypes,
  onDrop: PropTypes.func.isRequired,
  className: PropTypes.string,
};

BunDropzone.defaultProps = {
  className: '',
  bun: null,
};

export default BunDropzone;
