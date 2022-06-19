import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path=""></Route>
      <Route path=""></Route>
      <Route path=""></Route>
    </Switch>
  );
}

export default Routes;
