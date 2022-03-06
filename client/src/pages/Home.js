import React from 'react'

import CoinCard from '../components/CoinCard'
import Container from '../components/Container'
import Modal from '../components/Modal'
import { useUtils } from '../hooks/useUtils'
import { useCoins } from '../hooks/useCoins'
import Login from '../components/Login'
import Signup from '../components/Signup'

import Auth from '../utils/auth'

const Home = () => {
    const { isAuthModalOpen, closeAuthModal, isLoginMode } = useUtils()
    const isAuthenticated = Auth.loggedIn()
    const { coins } = useCoins()

    return (
        <main>
            <Container className="mt-12 md:mt-20 ">
                <Modal
                    modalIsOpen={isAuthModalOpen}
                    closeModal={closeAuthModal}
                >
                    {isLoginMode ? <Login /> : <Signup />}
                </Modal>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-8">
                    {coins?.map(coin => (
                        <CoinCard
                            key={coin.id}
                            id={coin.id}
                            name={coin.name}
                            symbol={coin.symbol}
                            price={coin.priceUsd}
                            rank={coin.rank}
                            volume={coin.volumeUsd24Hr}
                            supply={coin.supply}
                            marketCapUsd={coin.marketCapUsd}
                            isIconShown={isAuthenticated}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}

export default Home
