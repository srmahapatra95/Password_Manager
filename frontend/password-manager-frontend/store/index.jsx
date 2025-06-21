import React,{ createContext, useReducer , useState} from "react";
import {authReducer, registerReducer, screenReducer, tabReducer, listViewReducer, deleteItemsReducer} from './reducers/reducers'

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
    message: null
}
const initialTabState = {
    activeTab:[],
    tabButtonList: [],
    tabContentList:[]
}

const initialScreenState = {
    show: false,
    content: null,
    enablePasswordChange: false,
    showTabContentScreen: false
}


const initialListViewState = {
    loading: false,
    itemslist: [],
}

initialDeleteItemsState = {
    deleteitems: []
}

export const GlobalContext = createContext(initialAuthState)

const GlobalProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
    const [registerState,registerDispatch] = useReducer(registerReducer, initialregisterState)
    const [screenState, screenDispatch] = useReducer(screenReducer,initialScreenState)
    const [tabState, tabDispatch] = useReducer(tabReducer,initialTabState)
    const [listViewState, listViewDispatch] = useReducer(listViewReducer,initialListViewState)
    const [deleteItemsState, deleteItemsDispatch] = useReducer(deleteItemsReducer,initialDeleteItemsState)


    const [id, setId] = useState(-1)
    const [user, setUser] = useState(-1)
    const [details_for, setDetails_for] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [info, setInfo] = useState('')

    return <GlobalContext.Provider value={{
        authState: authState,
        authDispatch: authDispatch,
        registerState:registerState,
        registerDispatch:registerDispatch,
        screenState:screenState,
        screenDispatch:screenDispatch,
        tabState:tabState,
        tabDispatch:tabDispatch,
        listViewState:listViewState,
        listViewDispatch:listViewDispatch,
        deleteItemsState:deleteItemsState,
        deleteItemsDispatch: deleteItemsDispatch,

        id:id,
        setId:setId,

        user:user, 
        setUser:setUser,

        details_for:details_for,
        setDetails_for:setDetails_for,
        username:username,
        setUsername:setUsername,
        email:email,
        setEmail:setEmail,
        mobile:mobile,
        setMobile:setMobile,
        password:password,
        setPassword:setPassword,
        info:info,
        setInfo:setInfo,
    }}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalProvider;