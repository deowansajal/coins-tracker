import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../utils/auth'
import Container from '../Container'

const Logo = () => {
    return (
        <div>
            <Link className="text-light" to="/">
                <h3 className=" text-xl font-medium">CoinTracker</h3>
            </Link>
        </div>
    )
}

const NavLink = ({ children, to }) => {
    return (
        <Link className="font-medium mx-2" to={to}>
            {children}
        </Link>
    )
}

const Nav = ({ logout }) => {
    if (Auth.loggedIn()) {
    }
    return (
        <nav>
            {Auth.loggedIn() ? (
                <>
                    {/* <span>Hey there, {Auth.getProfile().data.username}!</span> */}
                    <button
                        className="font-medium  px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-600"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            )}
        </nav>
    )
}

const Header = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()
    }
    return (
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 py-4 text-white">
            <Container className="flex justify-between">
                <Logo />
                <Nav />
            </Container>
        </header>
    )
}

export default Header
