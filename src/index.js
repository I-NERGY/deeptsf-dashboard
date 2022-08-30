import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./context/AuthContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

ReactDOM.render(<React.StrictMode>
    <BrowserRouter>
        <AuthContextProvider>
            <Routes>
                <Route path={'/*'} element={<App/>}/>
            </Routes>
        </AuthContextProvider>
    </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));


reportWebVitals();
