import React, {useState, useEffect, useContext} from 'react';
import useAuthContext from "../../hooks/useAuthContext";
import {useLogin} from "../../hooks/useLogin";
import {Link, useNavigate, useLocation} from "react-router-dom";

import axios from '../../api/axios'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import ErrorMessage from "../../components/layout/ErrorMessage";
import Loading from "../../components/layout/Loading";

const useStyles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        background: 'linear-gradient(to right, #1A88C9, #2AB683)'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        background: 'linear-gradient(to right, #1A88C9, #2AB683)'
    },
};

const SignIn = (props) => {
    const {login, error, isLoading} = useLogin()
    const {setAuth} = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/';

    const classes = useStyles;

    // Value and handlers for toggle visibility effect in password fields
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // Values and handlers for authentication
    const [username, setUsername] = useState('')
    const [usernameEmpty, setUsernameEmpty] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [signInAttempted, setSignInAttempted] = useState(false)
    const [signInFailed, setSignInFailed] = useState(false)

    // Function for username field validity
    const checkUsername = () => {
        username === '' ? setUsernameEmpty(true) : setUsernameEmpty(false)
    }

    // Function for password field validity
    const checkPassword = () => {
        password === '' ? setPasswordEmpty(true) : setPasswordEmpty(false)
    }

    const handleChangeUsername = e => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleChangePassword = e => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSignIn = (username, password) => {
        login(username, password)
    }

    const checkForm = (e) => {
        e.preventDefault()

        // Initialize this value in order to enable field checks on change
        // See useEffect calls below checkForm()
        setSignInAttempted(true)

        checkUsername()
        checkPassword()

        // If all fields are valid, proceed to Sign In
        if (username !== '' && password !== '') handleSignIn(username, password)
    }

    // Check validity of email field after the first Sign In attempt (user has pressed Sign In button)
    useEffect(() => {
        if (signInAttempted === true) checkUsername()
    }, [checkUsername, username, signInAttempted])

    // Check validity of password field after the first Sign In attempt (user has pressed Sign In button)
    useEffect(() => {
        if (signInAttempted === true) checkPassword()
    }, [checkPassword, password, signInAttempted])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{mt: 8}}>
                <div className={classes.paper}>
                    <Box sx={{m: 1}}>
                        <Avatar sx={{bgcolor: 'secondary.main', mx: 'auto'}} className={classes.avatar}>
                            <LockOutlinedIcon color={"white"}/>
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" align={'center'}>
                        Sign In
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <form className={classes.form} noValidate>
                            <TextField
                                onChange={e => handleChangeUsername(e)}
                                color='secondary'
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                type="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                helperText={(usernameEmpty && username === '') ? "This field is required." : ''}
                                error={(usernameEmpty && username === '')}
                            />
                            <TextField
                                onChange={e => handleChangePassword(e)}
                                color='secondary'
                                label='Password'
                                variant="outlined"
                                fullWidth
                                required
                                helperText={passwordEmpty && "This field is required."}
                                error={passwordEmpty}
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {error &&
                                <ErrorMessage message="The credentials you provided do not match. Please try again."/>}
                            {isLoading &&
                                <Box mt={3} display="flex" justifyContent="center" alignItems="center"><Loading/></Box>}
                            <Box sx={{mt: 3, mb: 2}}>
                                <Button
                                    style={{color: 'white'}}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={e => checkForm(e)}
                                >
                                    <Typography>Sign In</Typography>
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </div>
            </Box>
        </Container>
    );
}

export default SignIn;