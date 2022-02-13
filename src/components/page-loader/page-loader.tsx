import React from 'react';
import Loader from '../../icons/loader';
import loaderStyles from './page-loader.module.css';

const PageLoader: React.FC = () => (
  <div className={loaderStyles['loader']}>
    <Loader width={48} height={48} />
  </div>
);

export default PageLoader;
