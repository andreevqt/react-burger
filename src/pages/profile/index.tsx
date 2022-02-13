import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Profile from './profile';
import History from './history';

const Index: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Profile />
      </Route>
      <Route path={`${path}/orders`} exact>
        <History />
      </Route>
    </Switch>
  );
};

export default Index;
