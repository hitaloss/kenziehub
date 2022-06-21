import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Routes() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return setIsLogged(true);
  }, [isLogged]);
  return (
    <Switch>
      <Route exact path="/">
        <Login setIsLogged={setIsLogged} isLogged={isLogged} />
      </Route>
      <Route path="/register">
        <Register isLogged={isLogged} />
      </Route>
      <Route path="/dashboard"></Route>
      <Route path=""></Route>
    </Switch>
  );
}

export default Routes;
