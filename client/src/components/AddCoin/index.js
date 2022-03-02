import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useUtils } from '../../hooks/useUtils'
import { ADD_USER } from '../../utils/mutations'
import Button from '../Button'
import FormWrapper from '../FormWrapper'
import InputField from '../InputField'

const AddCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState('')

    const { setIsLoginMode } = useUtils()

    const [addUser, { data }] = useMutation(ADD_USER)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = event => {
        const { value } = event.target

        setEnteredNewCoin(value)
    }

    const handleFormSubmit = async event => {
        // event.preventDefault()
        // console.log(formState)
        // try {
        //     const { data } = await addUser({
        //         variables: { ...formState },
        //     })
        //     Auth.login(data.addUser.token)
        // } catch (e) {
        //     setErrorMessage(e.message)
        //     console.error(e)
        // }
    }
    return (
        <div className="mx-4">
            <FormWrapper>
                {/* <div className="text-red-400">{errorMessage}</div> */}
                <h2 className="text-4xl mb-8 text-center font-medium">
                    Add new coin
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        placeholder="Add new coin"
                        name="addNewCoin"
                        value={enteredNewCoin}
                        onChange={handleChange}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </FormWrapper>
        </div>
    )
}

export default AddCoin
