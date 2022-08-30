// In App.js, wrap components that require Authentication with this component

import React from "react";
import {useEffect, useState} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../api/axios";

const RequireAuth = () => {
    const {auth, setAuth} = useAuthContext()
    const [accessTokenValid, setAccessTokenValid] = useState('')
    const location = useLocation()

    useEffect(() => {
        let isMounted = true;

        axios.post('/token/introspect', {token: auth.accessToken})
            .then(response => {
                setAccessTokenValid(response.data.active === true)
                response.data.active !== true ? setAuth({}) : void (0)
                response.data.active !== true ? localStorage.clear() : void (0)
            })
            .catch(error => {
                setAccessTokenValid(false)
                setAuth({})
                localStorage.clear()
                console.log(error)
            })

        return () => {
            isMounted = false;
        }
    })

    return (
        <React.Fragment>
            {accessTokenValid && <Outlet/>}
            {(accessTokenValid === false || !auth.accessToken) &&
            <Navigate to={'/signin'} state={{from: location}} replace/>}
        </React.Fragment>
    )
}

export default RequireAuth