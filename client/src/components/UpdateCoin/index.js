import React, { useState } from 'react'

import Button from '../Button'
import FormWrapper from '../FormWrapper'
import InputField from '../InputField'

import Coin from '../../utils/coin'
import { useCoins } from '../../hooks/useCoins'

const UpdateCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState(Coin.getCurrentCoin())

    const { errorMessage, updateCoinSubmitHandler } = useCoins()

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = async event => {
        event.preventDefault()
        updateCoinSubmitHandler(enteredNewCoin)
    }
    return (
        <div className="mx-4">
            <FormWrapper>
                <div className="text-red-400">{errorMessage}</div>
                <h2 className="text-4xl mb-8 text-center font-medium">
                    Update Coin
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        placeholder="Update coin"
                        name="updateCoin"
                        value={enteredNewCoin}
                        onChange={handleChange}
                    />

                    <Button type="submit">Update Coin</Button>
                </form>
            </FormWrapper>
        </div>
    )
}

export default UpdateCoin
