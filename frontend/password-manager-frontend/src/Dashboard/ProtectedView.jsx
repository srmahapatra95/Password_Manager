import {React ,useContext,useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../store';

function ProtectedView() {
    const {authState, authDispatch} = useContext(GlobalContext);
    console.log(authState.token)
    if(authState.token == null){
        return <Navigate to='/auth' replace/>
    }
    return <Outlet/>
}

export default ProtectedView;
