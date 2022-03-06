import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = Auth.loggedIn()
    return (
        <Route
            exact
            {...rest}
            render={({ location, ...props }) =>
                !isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PrivateRoute
