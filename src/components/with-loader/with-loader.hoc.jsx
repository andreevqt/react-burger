/* eslint-disable */
import WithLoader from './with-loader';

const withLoader = (WrappedComponent) => ({ isLoading, ...rest }) => (
  <WithLoader isLoading={isLoading}>
    <WrappedComponent {...rest} />
  </WithLoader>
);

export default withLoader;
