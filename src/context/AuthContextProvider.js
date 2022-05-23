import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(localStorage.getItem('userTemp') ? JSON.parse(localStorage.getItem('userTemp')) : {});

    useEffect(() => {
        setAuth(localStorage.getItem('userTemp') ? JSON.parse(localStorage.getItem('userTemp')) : {})
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;