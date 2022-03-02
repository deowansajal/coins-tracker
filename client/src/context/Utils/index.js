import { createContext, useState } from 'react'

export const UtilsContext = createContext()

const UtilsProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isAddCoinModalOpen, setIsAddCoinModalOpen] = useState(false)

    const openAuthModal = () => setIsAuthModalOpen(true)
    const closeAuthModal = () => setIsAuthModalOpen(false)

    const openAddCoinModal = () => setIsAddCoinModalOpen(true)
    const closeAddCoinModal = () => setIsAddCoinModalOpen(false)

    const value = {
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isLoginMode,
        setIsLoginMode,
        setIsAuthModalOpen,
        isAddCoinModalOpen,
        openAddCoinModal,
        closeAddCoinModal,
    }

    return (
        <UtilsContext.Provider value={value}>{children}</UtilsContext.Provider>
    )
}

export default UtilsProvider
