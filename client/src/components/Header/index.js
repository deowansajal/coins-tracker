import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'
import Container from '../Container'

const Logo = () => {
    return (
        <div>
            <Link className="text-light" to="/">
                <h3 className="text-xl font-medium ml-4">CoinTracker</h3>
            </Link>
        </div>
    )
}

const NavListItems = ({ logout }) => {
    if (Auth.loggedIn()) {
        return (
            <button
                className="font-medium mr-4 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-600"
                onClick={logout}
            >
                Logout
            </button>
        )
    }
    return (
        <Link className="font-medium mr-4" to="/login">
            Login
        </Link>
    )
}

const Header = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()
    }
    return (
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 py-4 text-white shadow-md shadow-cyan-500/40">
            <Container className="flex justify-between">
                <Logo />
                <nav>
                    <NavListItems logout={logout} />
                </nav>
            </Container>
        </header>
    )
}

export default Header
