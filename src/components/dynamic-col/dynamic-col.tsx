import React, { useMemo } from 'react';
import classNames from 'classnames';
import dynamicColStyles from './dynamic-col.module.css';

type TDynamicColProps = {
  items?: number[];
  perColumn?: number;
  label: string;
  done?: boolean;
};

const DynamicCol: React.FC<TDynamicColProps> = ({
  items = [],
  label,
  perColumn = 5,
  done = false,
}) => {

  const itemClasses = classNames('text text_type_digits-default mb-2', { [dynamicColStyles['done']]: done });

  const itemsToRender = useMemo(() => items.reduce((acc: number[][], current, index) => {
    const idx = Math.floor(index / perColumn);
    acc[idx] = acc[idx] || [];
    acc[idx].push(current);
    return acc;
  }, []), [items])

  return (
    <div className={classNames(dynamicColStyles['wrapper'], 'custom-scroll')}>
      <h5 className="text text_type_main-medium mb-6">{label}</h5>
      <div className={dynamicColStyles['columns']}>
        {itemsToRender.map((column, i) => (
          <div className={dynamicColStyles['column']} key={i}>
            {column.map((item, j) => (
              <div className={itemClasses} key={j}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicCol;
