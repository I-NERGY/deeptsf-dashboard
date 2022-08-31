import {createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload.user, roles: action.payload.roles}
        case 'LOGOUT':
            return {user: null, roles: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null, roles: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const roles = localStorage.getItem('roles')
        if (user) {
            dispatch({type: 'LOGIN', payload: {user, roles}})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

