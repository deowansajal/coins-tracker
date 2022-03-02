import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import UtilsProvider from './context/Utils'
import Me from './pages/Me'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

function App() {
    return (
        <ApolloProvider client={client}>
            <UtilsProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/me">
                            <Me />
                        </Route>

                        <Route path="*">
                            <h1>Page Not Found</h1>
                        </Route>

                        {/* <Footer /> */}
                    </Switch>
                </Router>
            </UtilsProvider>
        </ApolloProvider>
    )
}

export default App
