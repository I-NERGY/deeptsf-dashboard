import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

import useAuthContext from "./useAuthContext";

export const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = (username, password) => {
        setError(false)
        setIsLoading(true)

        let credentials = {
            username: username,
            password: password
        }
        let LOGIN_URL = '/user/get/token'

        axios.post('http://vesselai.epu.ntua.gr:4000' + LOGIN_URL, credentials)
            .then(response => {
                const accessToken = response.data?.access_token

                // save the user to local storage
                localStorage.setItem('user', JSON.stringify({username, password, accessToken}))

                // update the auth context
                dispatch({type: 'LOGIN', payload: {username, password, accessToken}})

                setIsLoading(false)
                navigate('/')
            })
            .catch(error => {
                setError(true)
                setIsLoading(false)
            })
    }

    return {login, isLoading, error}
}