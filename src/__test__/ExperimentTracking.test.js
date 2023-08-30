import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";

import ExperimentTracking from "../pages/ExperimentTracking";

it('renders Track Experiment section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <ExperimentTracking/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const experimentTrackingTrackExperimentSection = screen.getByTestId('experimentTrackingTrackExperimentSection')
    expect(experimentTrackingTrackExperimentSection).toBeInTheDocument();
})