import React from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';

function RecursiveRouter(props) {
  const renderChild = () => <props.component routes={props.routes}
  {...props} />;

  return (
    <Route path={props.path} render={renderChild} />
  );
}

function GenericRouter({ path = '/', routes = [] }) {
  const location = useLocation();

  // This was an external/deliberate navigation
  // rather than something prompted by the router
  const external = !location.key;

  // The default route is the first member of the routes prop with a
  // truthy value for the default field.
  const defaultPath = (routes.find(x => x.default) || {}).path || '/';

  const renderDefault = () => <Redirect to={defaultPath} />;
  const renderError = () => <Redirect to='/error' />;

  return (
    <Switch>
      { /* The default route should be explicitly redirected */ }
      <Route path={path} exact render={renderDefault} />

      {routes.map((route, i) => <RecursiveRouter key={i} {...route} />)}

      { /* All other routes get redirected to the error route */ }
      <Route render={external ? renderDefault : renderError} />
    </Switch>
  );
}

export { RecursiveRouter, GenericRouter };
export default RecursiveRouter;
