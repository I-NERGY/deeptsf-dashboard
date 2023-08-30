import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";

import CodelessForecast from "../pages/CodelessForecast";

// To run the tests, comment and uncomment the needed lines in the main component
// Guidance is offered in the component with comments
it('renders Dataset Configuration section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{ onLoad: 'login-required' }}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <CodelessForecast/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const codelessForecastDatasetConfiguration = screen.getByTestId('codelessForecastDatasetConfiguration')
    expect(codelessForecastDatasetConfiguration).toBeInTheDocument();
})

it('renders Model Training section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{ onLoad: 'login-required' }}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <CodelessForecast/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const codelessForecastModelTraining = screen.getByTestId('codelessForecastModelTraining')
    expect(codelessForecastModelTraining).toBeInTheDocument();
})

it('renders Model Evaluation section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{ onLoad: 'login-required' }}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <CodelessForecast/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const codelessForecastModelEvaluationConfiguration = screen.getByTestId('codelessForecastModelEvaluationConfiguration')
    expect(codelessForecastModelEvaluationConfiguration).toBeInTheDocument();
})

it('renders Experiment Execution section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{ onLoad: 'login-required' }}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <CodelessForecast/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const codelessForecastExperimentExecution = screen.getByTestId('codelessForecastExperimentExecution')
    expect(codelessForecastExperimentExecution).toBeInTheDocument();
})