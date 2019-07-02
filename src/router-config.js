import React from 'react'

import { Route, Switch } from "react-router-dom";

// import Home from "./components/home";
// import OrdersView from "./components/orders-view";
// import CustomersView from "./components/customers-view";
// import Login from './components/auth/login';
// import AuthRoute from './components/auth/authRoute';
// import Navbar from './components/navbar/navbar';
// import NavLayout from './components/layout/nav-layout';

import NavLayout from './layouts/nav-layout';
import Dashboard from "./features/dashboard/dashboard";
import Team from './features/team/team';
import state from './features/states/state';





const RouterConfig = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <NavLayout component={Dashboard} />
            </Route>
            <Route path="/teams" exact>
                <NavLayout component={Team} />
            </Route>
            <Route path="/states" exact>
                <NavLayout component={state} />
            </Route>
        </Switch>

    )

}

export default RouterConfig
