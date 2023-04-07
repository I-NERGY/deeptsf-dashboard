import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./context/AuthContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {ReactKeycloakProvider} from "@react-keycloak/web";
import my_keycloak from "./Keycloak"

ReactDOM.render(
    <ReactKeycloakProvider authClient={my_keycloak} initOptions={{ onLoad: 'login-required' }}>
        <React.StrictMode>
            <BrowserRouter>
                <AuthContextProvider>
                    <Routes>
                        <Route path={'/*'} element={<App/>}/>
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ReactKeycloakProvider>, document.getElementById('root'));

reportWebVitals();
