import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginMain from "../components/Login/loginMain";
import MenuCenter from "../components/MenuCenter";
import Spinner from "../components/Spinner/spinner";

const Routes = () => {
  return (
    <Suspense fallback={Spinner}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginMain />
          </Route>
          <Route exact path="/home">
            <MenuCenter />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
