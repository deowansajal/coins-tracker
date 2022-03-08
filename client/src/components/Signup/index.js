import React, { useState } from 'react'

import { useMutation } from '@apollo/client'

import { ADD_USER } from '../../utils/mutations'

import Auth from '../../utils/auth'

import InputField from '../InputField'

import Button from '../Button'
import { useUtils } from '../../hooks/useUtils'
import FormWrapper from '../FormWrapper'
import ToastMessage from '../ToastMessage'

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })

    const { setIsLoginMode } = useUtils()

    const [addUser, { data }] = useMutation(ADD_USER)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        try {
            const { data } = await addUser({
                variables: { ...formState },
            })

            setFormState({
                username: '',
                email: '',
                password: '',
            })
            Auth.login(data.addUser.token)
        } catch (e) {
            setErrorMessage(e.message)
            console.error(e)
        }
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
                    Sign Up
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        placeholder="Your username"
                        name="username"
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                <div className="text-sm mt-5 mx-3 text-right ">
                    <span>Already have an Account ?</span>
                    <span
                        onClick={() => setIsLoginMode(true)}
                        className="font-medium cursor-pointer text-cyan-500 ml-2"
                    >
                        (Login)
                    </span>
                </div>
            </FormWrapper>
        </div>
    )
}

export default Signup
