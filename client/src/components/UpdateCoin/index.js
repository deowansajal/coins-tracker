import React, { useState } from 'react'

import Button from '../Button'
import FormWrapper from '../FormWrapper'
import InputField from '../InputField'

import Coin from '../../utils/coin'
import { useCoins } from '../../hooks/useCoins'
import ToastMessage from '../ToastMessage'

const UpdateCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState(Coin.getCurrentCoin())

    const { updateCoinSubmitHandler, errorMessage, setErrorMessage } =
        useCoins()

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = async event => {
        event.preventDefault()
        updateCoinSubmitHandler(enteredNewCoin)
    }
    return (
        <div className="mx-4">
            <FormWrapper>
                <ToastMessage
                    type="error"
                    message={errorMessage}
                    setMessage={setErrorMessage}
                />
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
