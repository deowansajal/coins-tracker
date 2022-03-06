import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from './auth'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuthenticated = Auth.loggedIn()
    return (
        <Route
            exact
            {...rest}
            render={({ location, ...props }) =>
                isAuthenticated && restricted ? (
                    <Redirect
                        to={{
                            pathname: '/me',
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

export default PublicRoute
