import React, { useContext, useEffect, useState} from "react"
import { GlobalContext } from "../../../store";
import { useToast } from "../../../hooks/useToast";
import { check_lock_screen_PIN, lock_unlock } from "../../../store/actions/actions";
import { Lock, AlertCircle } from 'lucide-react'

function DashBoardLockScreen({lock, setLock}){
    const [pin, setPin] = useState('')
    const [errorMsg, setErrorMsg] = useState({
        show: false,
        msg: ''
    })
    const {authState} = useContext(GlobalContext)
    const toast = useToast()

    useEffect(() => {
        const blockBack = () => {
            window.history.pushState(null, '', window.location.href)
        }
        window.history.pushState(null, '', window.location.href)
        window.addEventListener('popstate', blockBack)
        return () => window.removeEventListener('popstate', blockBack)
    }, [])
    function func_lock_unlock(){
                const setLockAction = lock_unlock()
                const data = {
                  lock_screen_status: !lock
                }
                setLockAction(data)
                setLock({type: 'UNLOCK'})
    }
    function handlePINChange(e){
        setPin(e.target.value)
        if(e.target.value.length === 6){
            const PINAction = check_lock_screen_PIN(setErrorMsg, errorMsg, setPin, lock, setLock,func_lock_unlock)
            const data = {
                lock_screen_password: e.target.value
            }
            PINAction(data)
        }
        if(e.target.value.length > 6){
            setErrorMsg({...errorMsg, show: true, msg: "Invalid PIN. Try Again..."})
        }
    }
    return (
        <div className="absolute top-0 left-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 w-screen h-screen flex flex-col">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center p-8 bg-stone-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
                    <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/20">
                        <p className='text-white text-3xl font-bold'>{authState.username?.slice(0,1).toUpperCase()}</p>
                    </div>
                    <p className='text-gray-900 dark:text-gray-100 text-xl font-semibold mb-6'>{authState.username}</p>

                    {errorMsg.show?(<>
                        <div className="flex flex-col items-center gap-3 p-4">
                            <div className='flex items-center gap-2 text-rose-500'>
                                <AlertCircle className='w-5 h-5' />
                                <p className="font-medium text-sm">{errorMsg.msg}</p>
                            </div>
                            <button onClick={() => setErrorMsg({...errorMsg, show:false, msg: ''})} className="px-6 py-2 cursor-pointer text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-xl text-sm transition-all">OK</button>
                        </div>
                    </>):(<>
                    <div className="flex flex-col items-center gap-3">
                        <div className='flex items-center gap-2 text-gray-400 mb-1'>
                            <Lock className='w-4 h-4' />
                            <span className='text-sm'>Enter 6-digit PIN</span>
                        </div>
                        <input placeholder="------" type="password" value={pin} onChange={(e)=>handlePINChange(e)} className="text-center text-2xl tracking-[0.5em] w-56 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition-all" maxLength={6} required />
                    </div>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default DashBoardLockScreen;
