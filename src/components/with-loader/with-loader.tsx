import React from 'react';
import PageLoader from '../page-loader/page-loader';

const WithLoader: React.FC<{
  isLoading?: boolean;
}> = ({ isLoading = false, children }) => (
  <>
    {children}
    {isLoading && <PageLoader />}
  </>
);

export default WithLoader;
