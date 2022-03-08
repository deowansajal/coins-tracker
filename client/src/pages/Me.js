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
import Loading from '../components/Loading'

const Me = () => {
    const {
        isAddCoinMode,
        isCoinModalOpen,
        closeCoinModal,
        addCoinMode,
        updateCoinMode,
        removeCoinHandler,
        userCoins,
        isLoading,
    } = useCoins()

    const isAuthenticated = Auth.loggedIn()

    if (isLoading) {
        return <Loading />
    }

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

                {userCoins.length === 0 && (
                    <h1 className="text-xl text-slate-500 text-center">
                        You haven't added any coin
                    </h1>
                )}

                <CoinsContainer>
                    {userCoins.map(coin => (
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
                            changePercent24Hr={coin.changePercent24Hr}
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
