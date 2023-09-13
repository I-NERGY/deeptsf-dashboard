import axios from "axios";
import {Route, Routes} from 'react-router-dom';

import {useKeycloak} from "@react-keycloak/web";

import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
// import SignIn from "./pages/auth/SignIn";
import UserProfile from "./pages/UserProfile";
import RequireAuth from "./components/RequireAuth";
// import RequireNotAuth from "./components/RequireNotAuth";

import {ThemeProvider, createTheme} from '@mui/material/styles';
import CodelessForecast from "./pages/CodelessForecast";
import ExperimentTracking from "./pages/ExperimentTracking";
import SystemMonitoring from "./pages/SystemMonitoring";

// Set primary color here
let primary = '#97A94D'

// Set secondary color here
let secondary = '#B2C561'

// Dashboard theme setup here
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        },
        barBackground: {
            main: `linear-gradient(to right, ${primary}, ${secondary})`
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'Roboto',
        ].join(','),
    }
});

function App() {
    const {keycloak} = useKeycloak()
    axios.defaults.baseURL = 'http://131.154.97.48:8080';
    axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}` || '';
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>

                        {/* Routes not accessible to logged-in users */}
                        {/*<Route element={<RequireNotAuth/>}>*/}
                        {/*    <Route path="/signin" element={<SignIn/>}/>*/}
                        {/*</Route>*/}

                        {/* Routes not accessible to logged-out users */}
                        <Route element={<RequireAuth/>}>
                            <Route path="/user/profile" element={<UserProfile/>}/>
                        </Route>

                        <Route element={<RequireAuth/>}>
                            <Route path="/codeless-forecast" element={<CodelessForecast/>}/>
                        </Route>

                        <Route element={<RequireAuth/>}>
                            <Route path="/monitoring" element={<SystemMonitoring/>}/>
                        </Route>

                        <Route element={<RequireAuth/>}>
                            <Route path="/experiment-tracking" element={<ExperimentTracking/>}/>
                        </Route>
                    </Routes>
                </Layout>
            </div>
        </ThemeProvider>
    );
}

export default App;
