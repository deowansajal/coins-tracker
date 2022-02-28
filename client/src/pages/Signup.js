import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { ADD_USER } from '../utils/mutations'

import Auth from '../utils/auth'
import InputField from '../components/Inputs'
import Button from '../components/Button'
import Container from '../components/Container'

const FormWrapper = ({ children }) => {
    return (
        <div className="max-w-md p-10 mt-20  mx-auto border rounded-xl shadow-lg bg-white">
            {children}
        </div>
    )
}

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [addUser, { error, data }] = useMutation(ADD_USER)

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        console.log(formState)
        try {
            const { data } = await addUser({
                variables: { ...formState },
            })

            Auth.login(data.addUser.token)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="mx-4">
            <div>{error && error.message}</div>

            <FormWrapper>
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
                    <Link
                        className="font-medium text-cyan-500 ml-2"
                        to="/login"
                    >
                        (Login)
                    </Link>
                </div>
            </FormWrapper>
        </div>
    )
}

export default Signup
