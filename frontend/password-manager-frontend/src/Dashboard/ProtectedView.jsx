import {React ,useContext,useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../store';

function ProtectedView() {
    const {authState, authDispatch} = useContext(GlobalContext);
    const token = localStorage.getItem("token")
    if(token == null){
        return <Navigate to='/auth' replace/>
    }
    return <Outlet/>
}

export default ProtectedView;
