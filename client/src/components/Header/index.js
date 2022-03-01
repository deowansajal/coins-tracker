import React from 'react'
import { Link } from 'react-router-dom'
import { useUtils } from '../../hooks/useUtils'

import Auth from '../../utils/auth'
import Button from '../Button'
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

const NavListItems = ({ logout, openAuthModal }) => {
    if (Auth.loggedIn()) {
        return (
            <>
                {/* <span>{Auth.getProfile()?.data?.username}</span> */}
                <button
                    className="font-medium mr-4 px-4 py-1 "
                    onClick={logout}
                >
                    Logout
                </button>
            </>
        )
    }
    return (
        <button
            className="font-medium mr-4 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-600"
            onClick={openAuthModal}
        >
            Login
        </button>
    )
}

const Header = () => {
    const { openAuthModal } = useUtils()

    const logout = event => {
        event.preventDefault()
        Auth.logout()
    }
    return (
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 py-4 text-white shadow-md shadow-cyan-500/40">
            <Container className="flex justify-between">
                <Logo />
                <nav>
                    <NavListItems
                        logout={logout}
                        openAuthModal={openAuthModal}
                    />
                </nav>
            </Container>
        </header>
    )
}

export default Header
