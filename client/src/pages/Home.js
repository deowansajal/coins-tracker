import React from 'react'

import CoinCard from '../components/CoinCard'
import Container from '../components/Container'
import Modal from '../components/Modal'
import { useUtils } from '../hooks/useUtils'
import { useCoins } from '../hooks/useCoins'
import Login from '../components/Login'
import Signup from '../components/Signup'

import Auth from '../utils/auth'
import CoinsContainer from '../components/CoinsContainer'
import Loading from '../components/Loading'

const Home = () => {
    const { isAuthModalOpen, closeAuthModal, isLoginMode } = useUtils()
    const isAuthenticated = Auth.loggedIn()
    const { slicedCoins, isLoading } = useCoins()

    if (isLoading || slicedCoins.length === 0) {
        return <Loading />
    }

    return (
        <main>
            <Container className="mt-12 md:mt-20 ">
                <Modal
                    modalIsOpen={isAuthModalOpen}
                    closeModal={closeAuthModal}
                >
                    {isLoginMode ? <Login /> : <Signup />}
                </Modal>
                <CoinsContainer>
                    {slicedCoins.map(coin => (
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
                </CoinsContainer>
            </Container>
        </main>
    )
}

export default Home
