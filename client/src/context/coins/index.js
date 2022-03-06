import { createContext, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import Coin from '../../utils/coin'

import { ADD_COIN, REMOVE_COIN, UPDATE_COIN } from '../../utils/mutations'
import { QUERY_COINS } from '../../utils/queries'

import { API } from '../../utils/api'
import Auth from '../../utils/auth'

import filterUserCoins from '../../utils/filterUserCoins'

export const CoinsContext = createContext()

const CoinsProvider = ({ children }) => {
    const [coins, setCoins] = useState([])
    const [isCoinModalOpen, setIsCoinModalOpen] = useState(false)
    const [isAddCoinMode, setIsAddCoinMode] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const { data, refetch } = useQuery(QUERY_COINS)
    const [addCoin] = useMutation(ADD_COIN)
    const [updateCoin] = useMutation(UPDATE_COIN)
    const [removeCoin] = useMutation(REMOVE_COIN)

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

    const addCoinSubmitHandler = async coin => {
        try {
            await addCoin({
                variables: { coin },
            })
            refetch()
            closeCoinModal()
        } catch (e) {
            setErrorMessage(e.message)
            console.error(e)
        }
    }

    const updateCoinSubmitHandler = async coin => {
        try {
            await updateCoin({
                variables: {
                    coin: Coin.getCurrentCoin(),
                    newCoin: coin,
                },
            })
            refetch()
            closeCoinModal()
        } catch (e) {
            setErrorMessage(e.message)
            console.error(e)
        }
    }

    const removeCoinHandler = async coin => {
        try {
            await removeCoin({
                variables: { coin },
            })
            refetch()
        } catch (e) {
            setErrorMessage(e.message)
            console.error(e)
        }
    }

    useEffect(() => {
        ;(async function () {
            const { data } = await API.getCoins()
            const slicedCoins = data?.slice(0, 10)

            setCoins(slicedCoins)
        })()
    }, [])

    const _coins = Auth.loggedIn()
        ? filterUserCoins(coins, data?.user?.coins)
        : coins

    const value = {
        isCoinModalOpen,
        openCoinModal,
        closeCoinModal,
        isAddCoinMode,
        setIsAddCoinMode,
        addCoinMode,
        updateCoinMode,
        addCoinSubmitHandler,
        updateCoinSubmitHandler,
        removeCoinHandler,
        errorMessage,
        coins: _coins,
    }

    return (
        <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>
    )
}

export default CoinsProvider
