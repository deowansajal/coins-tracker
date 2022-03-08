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
import CoinsContainer from '../components/CoinsContainer'

const Me = () => {
    const {
        isAddCoinMode,
        isCoinModalOpen,
        closeCoinModal,
        addCoinMode,
        updateCoinMode,
        removeCoinHandler,
        userCoins,
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

                <CoinsContainer>
                    {userCoins?.map(coin => (
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
                </CoinsContainer>
            </Container>
        </main>
    )
}
export default Me
