import React from 'react';
import Skeleton from '../../../components/skeleton/skeleton';

const IngredientSkeleton = () => (
  <>
    <Skeleton width="240px" height="240px" className="mt-4" variant="rounded" />
    <Skeleton width="240px" height="30px" className="mt-8 mb-4" />
    <div className="d-flex space-between" style={{ width: '240px' }}>
      <Skeleton width="20%" height="30px" />
      <Skeleton width="20%" height="30px" />
      <Skeleton width="20%" height="30px" />
      <Skeleton width="20%" height="30px" />
    </div>
  </>
);

export default IngredientSkeleton;
