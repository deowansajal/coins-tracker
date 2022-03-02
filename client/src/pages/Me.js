import React from 'react'
import CoinCard from '../components/CoinCard'
import Container from '../components/Container'
import Modal from '../components/Modal'
import { coins } from '../data'

const Me = () => {
    return (
        <main>
            <Container className="mt-20 ">
                {/* <Modal
                    modalIsOpen={isAuthModalOpen}
                    closeModal={closeAuthModal}
                >
                    {isLoginMode ? <Login /> : <Signup />}
                </Modal> */}
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
                            isIconShown={true}
                        />
                    ))}
                </div>
            </Container>
        </main>
    )
}
export default Me
