import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";

import ExperimentTracking from "../pages/ExperimentTracking";

// To run the tests, comment and uncomment the needed lines in the main component
// Guidance is offered in the component with comments
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