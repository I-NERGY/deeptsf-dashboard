import React from 'react';
import {render, screen} from "@testing-library/react";
import my_keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "../context/AuthContext";

import SystemMonitoring from "../pages/SystemMonitoring";

it('renders CPU Usage section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <SystemMonitoring/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const systemMonitoringCpuUsage = screen.getByTestId('systemMonitoringCpuUsage')
    expect(systemMonitoringCpuUsage).toBeInTheDocument();
})

it('renders GPU Usage section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <SystemMonitoring/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const systemMonitoringGpuUsage = screen.getByTestId('systemMonitoringGpuUsage')
    expect(systemMonitoringGpuUsage).toBeInTheDocument();
})

it('renders Memory Usage section', () => {
    render(
        <ReactKeycloakProvider authClient={my_keycloak} initOptions={{onLoad: 'login-required'}}>
            <React.StrictMode>
                <BrowserRouter>
                    <AuthContextProvider>
                        <SystemMonitoring/>
                    </AuthContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
    const systemMonitoringMemoryUsage = screen.getByTestId('systemMonitoringMemoryUsage')
    expect(systemMonitoringMemoryUsage).toBeInTheDocument();
})