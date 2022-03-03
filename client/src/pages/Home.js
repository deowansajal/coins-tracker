import React from 'react'

import CoinCard from '../components/CoinCard'
import Container from '../components/Container'
import Modal from '../components/Modal'
import { coins } from '../data'
import { useUtils } from '../hooks/useUtils'
import Login from '../components/Login'
import Signup from '../components/Signup'

import Auth from '../utils/auth'
import { PlusIcon } from '../components/Icon'

import AddCoin from '../components/AddCoin'
import UpdateCoin from '../components/UpdateCoin'
import { AddCoinButton } from '../components/Button'

const Home = () => {
    const {
        isAuthModalOpen,
        closeAuthModal,
        isLoginMode,
        closeCoinModal,
        isCoinModalOpen,
        isAddCoinMode,
        addCoinMode,
        updateCoinMode,
    } = useUtils()

    const isAuthenticated = Auth.loggedIn()

    console.log(isLoginMode)

    return (
        <main>
            <Container className="mt-12 md:mt-20 ">
                {isAuthenticated && (
                    <>
                        <div className="mb-12 md:mb-20">
                            <AddCoinButton onClick={() => addCoinMode()}>
                                <PlusIcon />
                            </AddCoinButton>
                        </div>
                        <Modal
                            modalIsOpen={isCoinModalOpen}
                            closeModal={closeCoinModal}
                        >
                            {isAddCoinMode ? <AddCoin /> : <UpdateCoin />}
                        </Modal>
                    </>
                )}

                <Modal
                    modalIsOpen={isAuthModalOpen}
                    closeModal={closeAuthModal}
                >
                    {isLoginMode ? <Login /> : <Signup />}
                </Modal>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-y-8">
                    {coins.slice(0, 10).map(coin => (
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
                            addCoinMode={addCoinMode}
                            updateCoinMode={updateCoinMode}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}

export default Home
