import {React ,useContext,useState, useEffect, Suspense} from 'react'
import { Link, useNavigate } from 'react-router'
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../store';
import { is_authenticated_user } from '../../store/actions/actions'
import { useToast } from '../../hooks/useToast';
import { get_user_settings } from '../../store/actions/actions';


function ProtectedView() {
    const {authState, authDispatch} = useContext(GlobalContext);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const toast = useToast();
    const {lockScreenState, lockScreenDispatch} = useContext(GlobalContext)

    useEffect(()=> {
        const checkAuthentication = is_authenticated_user(authDispatch)
        checkAuthentication(token)
        
        const settingsAction = get_user_settings(lockScreenDispatch)
        settingsAction()
        
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
