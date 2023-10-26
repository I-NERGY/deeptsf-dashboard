import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";

import UserProfile from "../pages/UserProfile";

it('renders the main section of the user profile', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <UserProfile/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const useProfileMainSection = screen.getByTestId('useProfileMainSection')
    expect(useProfileMainSection).toBeInTheDocument();
})