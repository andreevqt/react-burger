import React from 'react';
import PageLoader from '../page-loader/page-loader';

type TWithLoaderProps = {
  isLoading?: boolean;
};

const WithLoader: React.FC<TWithLoaderProps> = ({ isLoading = false, children }) => (
  <>
    {children}
    {isLoading && <PageLoader />}
  </>
);

export default WithLoader;
