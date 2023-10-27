// In App.js, wrap components that require Authentication with this component
import React from "react";
import {Outlet} from "react-router-dom";

import {useKeycloak} from "@react-keycloak/web";

const RequireAuth = () => {
    const {keycloak} = useKeycloak()
    const allowed = process.env.REACT_APP_AUTH === "True" ? keycloak.authenticated : true;

    return (
        <React.Fragment>
            {allowed === true && <Outlet/>}
        </React.Fragment>
    )
}

export default RequireAuth