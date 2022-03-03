import { createContext, useState } from 'react'
import Coin from '../../utils/coin'

export const UtilsContext = createContext()

const UtilsProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true)

    const [isCoinModalOpen, setIsCoinModalOpen] = useState(false)
    const [isAddCoinMode, setIsAddCoinMode] = useState(true)

    const openAuthModal = () => setIsAuthModalOpen(true)
    const closeAuthModal = () => setIsAuthModalOpen(false)

    const openCoinModal = () => setIsCoinModalOpen(true)
    const closeCoinModal = () => setIsCoinModalOpen(false)

    const addCoinMode = () => {
        setIsAddCoinMode(true)
        openCoinModal()
    }
    const updateCoinMode = coin => {
        setIsAddCoinMode(false)
        openCoinModal()
        Coin.setCurrentCoin(coin)
    }

    const value = {
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isLoginMode,
        setIsLoginMode,
        setIsAuthModalOpen,
        isCoinModalOpen,
        openCoinModal,
        closeCoinModal,
        isAddCoinMode,
        setIsAddCoinMode,
        addCoinMode,
        updateCoinMode,
    }

    return (
        <UtilsContext.Provider value={value}>{children}</UtilsContext.Provider>
    )
}

export default UtilsProvider
