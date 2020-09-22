import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, isAdmin } from '../../Utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            (isLogin() || isAdmin()) && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />

    );
};

export default PublicRoute;