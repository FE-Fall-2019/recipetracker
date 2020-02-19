import React from 'react';
import { Switch } from 'react-router';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import main from './containers/main/main';
import Recipe from './containers/recipe/recipe';
import Create from './containers/create/create';
import Login from './containers/login/login';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({childProps}) => (
    <Switch>
        <AuthenticatedRoute
            path="/" exact
            component={main}
            props={childProps}
        />
        <AuthenticatedRoute
            path="/recipe/:id"
            component={Recipe}
            props={childProps}
        />
        <AuthenticatedRoute
            path="/create"
            component={Create}
            props={childProps}
        />
        <UnauthenticatedRoute
            path="/login"
            component={Login}
            props={childProps}
        />
    </Switch>
)