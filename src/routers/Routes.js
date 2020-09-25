import React from "react";
import { useStoreState } from "easy-peasy";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "../screen/Login";
import { ContactForm } from "../screen/ContactForm";
import { ContactList } from "../screen/ContactList";
import { ContactsEdit } from "../screen/ContactEdit";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../screen/NotFound";

const Routes = () => {
  const isAuth = useStoreState((state) => state.login.isLoggedIn);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/home" component={ContactList} auth={isAuth} />
        <ProtectedRoute path="/create" component={ContactForm} auth={isAuth} />
        <ProtectedRoute
          path="/edit/:id/:index"
          component={ContactsEdit}
          auth={isAuth}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default Routes;
