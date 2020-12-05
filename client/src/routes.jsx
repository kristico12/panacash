// dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// views
import Login from "./views/login.jsx";

export const Routes = (
    <Switch>
        <Route path="/404" render={() => <h1>NOT FOUND</h1>} />
        <Route path="/auth/login" component={Login} />
    </Switch>
);
