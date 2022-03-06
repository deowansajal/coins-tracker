import { useContext } from 'react'

import { UtilsContext } from '../../context/utils'

export const useUtils = () => useContext(UtilsContext)
