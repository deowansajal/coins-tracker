import React from 'react'
import { AddCoinButton } from '../components/Button'
import CoinCard from '../components/CoinCard'
import Container from '../components/Container'
import { PlusIcon } from '../components/Icon'
import Modal from '../components/Modal'
import { useCoins } from '../hooks/useCoins'

import AddCoin from '../components/AddCoin'
import UpdateCoin from '../components/UpdateCoin'
import Auth from '../utils/auth'

const Me = () => {
    const {
        isAddCoinMode,
        isCoinModalOpen,
        closeCoinModal,
        addCoinMode,
        updateCoinMode,
        removeCoinHandler,
        coins,
    } = useCoins()

    const isAuthenticated = Auth.loggedIn()

    return (
        <main>
            <Container className="mt-20 ">
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
                            addCoinMode={addCoinMode}
                            updateCoinMode={updateCoinMode}
                            removeCoinHandler={removeCoinHandler}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}
export default Me
