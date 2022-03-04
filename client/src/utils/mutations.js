import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_COIN = gql`
    mutation addCoin($coin: String!) {
        addCoin(coin: $coin) {
            coin
        }
    }
`
export const UPDATE_COIN = gql`
    mutation updateCoin($coin: String!, $newCoin: String!) {
        updateCoin(coin: $coin, newCoin: $newCoin) {
            coin
        }
    }
`
export const REMOVE_COIN = gql`
    mutation removeCoin($coin: String!) {
        removeCoin(coin: $coin) {
            coin
        }
    }
`
