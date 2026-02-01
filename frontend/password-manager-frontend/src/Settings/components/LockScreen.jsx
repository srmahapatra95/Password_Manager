import {React ,useContext,useState } from 'react'
import { GlobalContext } from '../../../store'
import { set_lock_screen, set_lock_screen_PIN, discard_lock_screen_PIN } from '../../../store/actions/actions'
import { useToast } from '../../../hooks/useToast'
import { Lock, XCircle, KeyRound, Trash2, ShieldCheck } from 'lucide-react'

function LockScreen() {
    const [showScreen, setShowScreen] = useState(false)
    const {lockScreenState, lockScreenDispatch} = useContext(GlobalContext)
    const is_Off = lockScreenState.lockScreen_On_Off === false
    const toast = useToast();
    function ToggleSwitch(){

        function handleSetLockScreen(){
            if(lockScreenState.lockScreen_On_Off === true){
                const setLockScreenAction =  set_lock_screen(lockScreenDispatch, 'LOCKSCREEN_OFF', false)
                setLockScreenAction({ lock_screen: false })
            }else if(lockScreenState.hasPin){
                const setLockScreenAction =  set_lock_screen(lockScreenDispatch, 'LOCKSCREEN_ON', true)
                setLockScreenAction({ lock_screen: true })
            }else{
                setShowScreen(true)
            }
        }

    return(<>
        <div className='flex items-center gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 transition-all'>
            <ShieldCheck className='w-4 h-4 text-indigo-500 flex-shrink-0' />
            <label className='text-sm font-medium text-gray-700 dark:text-gray-300 flex-1'>Enable Lock Screen</label>
            <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-500 dark:text-gray-400'>{lockScreenState.lockScreen_On_Off ? 'On' : 'Off'}</span>
                <label className="switch mx-1">
                    <input type="checkbox" checked={lockScreenState.lockScreen_On_Off} onChange={handleSetLockScreen}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        </>)
    }


    function SetLockScreen({
        showScreen, setShowScreen
    }){
        const [lockScreenPassword, setlockScreenPassword] = useState('')


        function handleSetLockScreenPassword(){
            const data = {
                lock_screen_password: lockScreenPassword
            }
            if(lockScreenPassword.length === 6){
                const setLockScreenPINAction =  set_lock_screen_PIN(toast)
                setLockScreenPINAction(data).then(() => {
                    if(!lockScreenState.lockScreen_On_Off){
                        const setLockScreenAction = set_lock_screen(lockScreenDispatch, 'LOCKSCREEN_ON', true)
                        setLockScreenAction({ lock_screen: true })
                    }
                    lockScreenDispatch({type: 'SET_HAS_PIN', payload: true})
                })
                setlockScreenPassword('')
                setShowScreen(false)
            }else{
                toast.error('PIN must be 6 digits...')
            }

        }


        return(<>
                 <div className="z-50 text-white absolute top-0 left-0 w-full h-full opaque rounded-xl">
                <div className="w-full p-3 flex flex-row justify-end">
                    <button onClick={()=>setShowScreen(!showScreen)} className="text-gray-300 hover:text-rose-400 transition-colors cursor-pointer">
                        <XCircle className='w-5 h-5' />
                    </button>
                </div>
                    <div className="w-full h-9/10 flex flex-col items-center justify-center px-8">
                    <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6'>
                        <KeyRound className='w-8 h-8 text-indigo-400' />
                    </div>
                    <label className="text-white font-semibold text-2xl mb-6">Set Lock Screen PIN</label>
                    <input maxLength={6} value={lockScreenPassword} onChange={(e) => setlockScreenPassword(e.target.value)} className="text-center text-white text-2xl tracking-[0.5em] bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" type="password" placeholder="------"/>
                    <button onClick={handleSetLockScreenPassword} className="mt-4 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-8/10 py-3 cursor-pointer rounded-xl transition-all shadow-lg shadow-indigo-500/20">Set PIN</button>
                </div>
                </div>

        </>)
    }

    function handleDiscardLockScreenPassword(){
            const data = {
                lock_screen_password: '000000'
            }
            const setLockScreenPINAction =  discard_lock_screen_PIN(toast)
            setLockScreenPINAction(data)
    }


    return (
    <>
    <div className='w-full h-full p-6 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start mb-6'>
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center'>
                    <Lock className='w-4 h-4 text-indigo-500' />
                </div>
                <label className='text-gray-900 dark:text-gray-100 font-semibold text-xl'>Lock Screen</label>
            </div>
            <div className='w-full h-px bg-gray-200 dark:bg-gray-800 mt-4'></div>
        </div>
        <div className='w-8/10 flex flex-col gap-4'>
            <ToggleSwitch/>
            <div className='flex items-center gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 transition-all'>
                <KeyRound className='w-4 h-4 text-indigo-500 flex-shrink-0' />
                <div className='flex-1'>
                    <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>Lock Screen PIN</label>
                    <div className='flex items-center gap-2'>
                        <button disabled={is_Off ? 'disabled': null} onClick={() => setShowScreen(!showScreen)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-all ${is_Off ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 bg-stone-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}>
                            <Lock className='w-3.5 h-3.5' />
                            Set PIN
                        </button>
                        <button disabled={is_Off ? 'disabled': null} onClick={handleDiscardLockScreenPassword} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-all ${is_Off ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 bg-stone-50 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}>
                            <Trash2 className='w-3.5 h-3.5' />
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {showScreen?(<SetLockScreen showScreen={showScreen} setShowScreen={setShowScreen}/>):(<></>)}
    </div>
    </>
    )
}

export default LockScreen;
