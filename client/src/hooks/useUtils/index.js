import { useContext } from 'react'

import { UtilsContext } from '../../context/Utils'

export const useUtils = () => useContext(UtilsContext)
