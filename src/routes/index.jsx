import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";

function Routes() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Switch>
      <Route exact path="/">
        <Login setIsLogged={setIsLogged} />
      </Route>
      <Route path=""></Route>
      <Route path=""></Route>
      <Route path=""></Route>
    </Switch>
  );
}

export default Routes;
