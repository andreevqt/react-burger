import React, { useMemo } from 'react';
import Skeleton from '../../skeleton/skeleton';
import ingredientsSkeletonStyles from './ingredients-skeleton.module.css';

type TIngredientSkeletonProps = {
  count?: number;
};

const IngredientSkeleton: React.FC<TIngredientSkeletonProps> = ({
  count = 4
}) => {
  const array = useMemo(() => [...Array(count).keys()], [count]);
  return (
    <div>
      <Skeleton variant="text" height="25px" width="20%" className="mt-10 mb-6" />
      <div className={ingredientsSkeletonStyles['grid']}>
        {array.map((num) => (
          <div key={num} className={ingredientsSkeletonStyles['card']}>
            <Skeleton variant="rectangular" height="100px" />
            <Skeleton width="60%" className="mt-4" height="15px" />
            <Skeleton width="40%" className="mt-2" height="15px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSkeleton;
