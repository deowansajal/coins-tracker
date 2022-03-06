import { useContext } from 'react'

import { CoinsContext } from '../../context/coins'

export const useCoins = () => useContext(CoinsContext)
