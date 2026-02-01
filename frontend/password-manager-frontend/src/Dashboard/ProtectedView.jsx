import { React, useContext, useState, useEffect, Suspense } from 'react'
import { Link, useNavigate, Navigate, Outlet } from 'react-router';
import { GlobalContext } from '../../store';
import { is_authenticated_user } from '../../store/actions/actions'
import { useToast } from '../../hooks/useToast';
import { get_user_settings } from '../../store/actions/actions';
import DashBoardLockScreen from './components/DashBoardLockScreen';
import { Loader2 } from 'lucide-react';

function ProtectedView() {
    const { authState, authDispatch } = useContext(GlobalContext);
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const toast = useToast();
    const { lockScreenState, lockScreenDispatch } = useContext(GlobalContext)

    useEffect(() => {
        const checkAuthentication = is_authenticated_user(authDispatch)
        checkAuthentication(token)

        const settingsAction = get_user_settings(lockScreenDispatch)
        settingsAction()
    }, [])



    if (token == null) {
        return <Navigate to='/' />
    }
    if (!lockScreenState.settingsLoaded) {
        return (
            <div className='flex items-center justify-center w-screen h-screen bg-stone-100 dark:bg-gray-950'>
                <Loader2 className='w-8 h-8 animate-spin text-slate-400' />
            </div>
        )
    }
    return (
        <Suspense fallback={
            <div className='flex items-center justify-center w-screen h-screen bg-stone-100 dark:bg-gray-950'>
                <Loader2 className='w-8 h-8 animate-spin text-slate-400' />
            </div>
        }>
            {lockScreenState.lock ? (<DashBoardLockScreen lock={lockScreenState.lock} setLock={lockScreenDispatch} />) : (<Outlet />)}
        </Suspense>
    )
}

export default ProtectedView;
