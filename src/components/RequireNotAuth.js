// In App.js, wrap components that require No Authentication with this component

import React from 'react';
import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const RequireNotAuth = () => {
    const {user} = useAuthContext()
    const location = useLocation()

    return (
        <React.Fragment>
            {!user ? <Outlet/> : <Navigate to={'/'} state={{from: location}} replace/>}
        </React.Fragment>
    );
}

export default RequireNotAuth;