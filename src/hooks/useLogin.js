import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import qs from 'qs';
import https from 'https'

import useAuthContext from "./useAuthContext";

export const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = (username, password) => {
        setError(false)
        setIsLoading(true)

        let credentials = qs.stringify({
            client_id: 'ntua-test-client',
            username,
            password,
            grant_type: 'password'
        });

        // Log the user in
        axios.post('https://oblachek.eu:8443/realms/inergy/protocol/openid-connect/token', credentials, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then(response => {
                const accessToken = response.data?.access_token
                localStorage.setItem('user', JSON.stringify({username, password, accessToken}))

                // Fetch user's roles
                axios.post('https://oblachek.eu:8443/realms/inergy/protocol/openid-connect/userinfo', null, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + accessToken
                    },
                })
                    .then(response => {
                        // save the user to local storage
                        localStorage.setItem('roles', response.data.realm_access.roles)

                        // update the auth context
                        dispatch({
                            type: 'LOGIN',
                            payload: {user: {username, password, accessToken}, roles: response.data.realm_access.roles}
                        })

                        setIsLoading(false)
                        navigate('/')
                    })
                    .catch(error => {
                        setError(true)
                        setIsLoading(false)
                    })
            })
            .catch(error => {
                setError(true)
                setIsLoading(false)
            })
    }

    return {login, isLoading, error}
}