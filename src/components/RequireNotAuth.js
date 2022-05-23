// In App.js, wrap components that require No Authentication with this component

import React from 'react';
import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireNotAuth = (props) => {
    const {auth} = useAuth()
    const location = useLocation()


    return (
        <React.Fragment>
            {!auth.username ? <Outlet/> : <Navigate to={'/'} state={{from: location}} replace/>}
        </React.Fragment>
    );
}

export default RequireNotAuth;