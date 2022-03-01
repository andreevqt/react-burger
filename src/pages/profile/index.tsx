import React from 'react';
import { useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
import Profile from './profile';
import History from './history';
import Order from '../order/order';

const Index: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={path} exact>
          <Profile />
        </Route>
        <Route path={`${path}/orders`} exact>
          <History />
        </Route>
        <Route path={`${path}/orders/:id`} exact>
          <Order />
        </Route>
      </Switch>
    </>
  );
};

export default Index;
