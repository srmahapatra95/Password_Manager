import React,{ createContext, useReducer } from "react";
import {authReducer, registerReducer} from './reducers/reducers'

const initialAuthState = {
    username: null,
    token: null,
    loading:false,
    error: null,
}
const initialregisterState = {
    loading: false,
    success: false,
    error: false,
}


export const GlobalContext = createContext(initialAuthState)

const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
    const [registerState,registerDispatch] = useReducer(registerReducer, initialregisterState)


    return <GlobalContext.Provider value={{
        authState: authState,
        authDispatch: authDispatch,
        registerState:registerState,
        registerDispatch:registerDispatch,
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalProvider;