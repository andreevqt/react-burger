import React from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import bunDropzoneStyles from './bun-dropzone.module.css';
import { TIngredient } from '../../../services/api';

type TBunDropzoneProps = {
  type?: 'top' | 'bottom';
  bun?: TIngredient | null;
  onDrop: (item: TIngredient) => void;
  className?: string;
};

const BunDropzone: React.FC<TBunDropzoneProps> = ({
  type = 'top',
  bun = null,
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

export default BunDropzone;
