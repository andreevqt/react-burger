import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../../skeleton/skeleton';
import ingredientsSkeletonStyles from './ingredients-skeleton.module.css';

const IngredientSkeleton = ({
  count,
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

IngredientSkeleton.propTypes = {
  count: PropTypes.number,
};

IngredientSkeleton.defaultProps = {
  count: 4,
};

export default IngredientSkeleton;
