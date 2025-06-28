import {React ,useContext,useState, useEffect, Suspense} from 'react'
import { Link, useNavigate } from 'react-router'
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../store';
import { is_authenticated_user } from '../../store/actions/actions'
import { useToast } from '../../hooks/useToast';


function ProtectedView() {
    const {authState, authDispatch} = useContext(GlobalContext);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(()=> {
        const checkAuthentication = is_authenticated_user(authDispatch)
        checkAuthentication(token)
    },[])



    if(token == null){
        return <Navigate to='/'/>
    }
    const comp = (<>
        <Suspense fallback={<p>Loading...</p>}>
            <Outlet/>
        </Suspense>
    </>)
    return (<>
        {comp}
    </>) 
}

export default ProtectedView;
