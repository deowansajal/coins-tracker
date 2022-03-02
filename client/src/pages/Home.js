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
import InputField from '../components/InputField'
import FormWrapper from '../components/FormWrapper'
import Button from '../components/Button'
import AddCoin from '../components/AddCoin'

const Home = () => {
    const {
        isAuthModalOpen,
        closeAuthModal,
        isLoginMode,
        openAddCoinModal,
        closeAddCoinModal,
        isAddCoinModalOpen,
    } = useUtils()

    const isAuthenticated = Auth.loggedIn()

    console.log(isLoginMode)

    return (
        <main>
            <Container className="mt-12 md:mt-20 ">
                {isAuthenticated && (
                    <>
                        <div className="mb-12 md:mb-20">
                            <button
                                onClick={() => openAddCoinModal()}
                                className="w-10 h-10 text-white flex justify-center items-center m-auto font-medium  rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow shadow-pink-500/40"
                            >
                                <PlusIcon />
                            </button>
                        </div>
                        <Modal
                            modalIsOpen={isAddCoinModalOpen}
                            closeModal={closeAddCoinModal}
                        >
                            <AddCoin />
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
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}

export default Home
