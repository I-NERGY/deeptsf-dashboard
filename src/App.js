import axios from "axios";
import {Route, Routes} from 'react-router-dom';
import RequireAuth from "./components/RequireAuth";

import Layout from "./components/layout/Layout";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/auth/SignIn";
import UserProfile from "./pages/UserProfile";
import RequireNotAuth from "./components/RequireNotAuth";

import {ThemeProvider, createTheme} from '@mui/material/styles';
import LoadForecast from "./pages/LoadForecast";
import Metrics from "./pages/Metrics";

axios.defaults.baseURL = 'http://131.154.97.48:8080';

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
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>

                        {/* Routes not accessible to logged-in users */}
                        <Route element={<RequireNotAuth/>}>
                            <Route path="/signin" element={<SignIn/>}/>
                        </Route>

                        {/* Routes not accessible to logged-out users */}
                        <Route element={<RequireAuth/>}>
                            <Route path="/user/profile" element={<UserProfile/>}/>
                        </Route>

                        <Route element={<RequireAuth/>}>
                            <Route path="/load-forecast" element={<LoadForecast/>}/>
                        </Route>

                        <Route path="/metrics" element={<Metrics/>}/>
                    </Routes>
                </Layout>
            </div>
        </ThemeProvider>
    );
}

export default App;
