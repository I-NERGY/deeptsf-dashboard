// import {createContext, useEffect, useState} from "react";
//
// const AuthContext = createContext({});
//
// export const AuthContext = ({children}) => {
//     const [auth, setAuth] = useState(localStorage.getItem('userTemp') ? JSON.parse(localStorage.getItem('userTemp')) : {});
//
//     useEffect(() => {
//         setAuth(localStorage.getItem('userTemp') ? JSON.parse(localStorage.getItem('userTemp')) : {})
//     }, [])
//
//     return (
//         <AuthContext.Provider value={{auth, setAuth}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
//
// export default AuthContext;

import {createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

