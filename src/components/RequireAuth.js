// In App.js, wrap components that require Authentication with this component

import React from "react";
import {useEffect, useState} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import axios from "../api/axios";

const RequireAuth = () => {
    const {user, loading} = useAuthContext()
    const [allowed, setAllowed] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (user) {
            user && setAllowed(true)
        } else {
            setAllowed(false)
        }
    }, [user]);

    return (
        <React.Fragment>
            {allowed === true && <Outlet/>}
            {!user && allowed === false && <Navigate to={'/signin'} state={{from: location}} replace/>}
        </React.Fragment>
    )
}

export default RequireAuth