// In App.js, wrap components that require Authentication with this component
import React from "react";
import {Outlet} from "react-router-dom";

import {useKeycloak} from "@react-keycloak/web";

const RequireAuth = () => {
    const {keycloak} = useKeycloak()
    const allowed = keycloak.authenticated;

    return (
        <React.Fragment>
            {/*<Outlet/>*/}
            {allowed === true && <Outlet/>}
            {/*{isLoggedIn === false && null}*/}
        </React.Fragment>
    )
}

export default RequireAuth