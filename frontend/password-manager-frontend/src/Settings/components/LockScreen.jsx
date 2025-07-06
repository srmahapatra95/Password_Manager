import {React ,useContext,useState } from 'react'
import { GlobalContext } from '../../../store'
import { set_lock_screen, set_lock_screen_PIN, discard_lock_screen_PIN } from '../../../store/actions/actions'
import { useToast } from '../../../hooks/useToast'

function LockScreen() {
    const [showScreen, setShowScreen] = useState(false)
    const {lockScreenState, lockScreenDispatch} = useContext(GlobalContext)
    const is_Off = lockScreenState.lockScreen_On_Off === false
    const toast = useToast();
    function ToggleSwitch(){
        
        function handleSetLockScreen(){
            let type, payload;
            if(lockScreenState.lockScreen_On_Off === true){
                type = 'LOCKSCREEN_OFF';
                payload = false
            }else{
                type = 'LOCKSCREEN_ON';
                payload = true
            }
            const setLockScreenAction =  set_lock_screen(lockScreenDispatch, type, payload)
            const data = {
                lock_screen: payload,
            }
            setLockScreenAction(data)
        }

    return(<>
        <div className='w-7/10 flex flex-col items-center justify-center'>
            <div className='w-full flex flex-row items-center justify-start p-2'>
                <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-sm'>Set Lock Screen</label>
                <div className='flex flex-row p-2 items-center justify-center ml-5'>
                    <div id='lock-screen-off' className=''>
                        <p className='text-slate-900 dark:text-slate-100'>Off</p>

                    </div>

                    <label class="switch mx-2">
                        <input type="checkbox" checked={lockScreenState.lockScreen_On_Off} onChange={handleSetLockScreen}/>
                        <span class="slider round"></span>
                    </label>

                    <div id='lock-screen-' className=''>
                        <p className='text-slate-900 dark:text-slate-100'>On</p>
                    </div>
                </div>

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
                setLockScreenPINAction(data)
                setlockScreenPassword('')
            }else{
                toast.error('PIN must be 6 digits...')
            }

        }  

    

    

    

        
        return(<>
                 <div className="z-50 text-white absolute top-0 left-0 w-full h-full opaque">
                <div className="w-full p-2 flex flex-row justify-end">
                    <button onClick={()=>setShowScreen(!showScreen)} className="text-black dark:text-white hover:bg-rose-800 hover:text-white dark:hover:text-black rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                </div>
                    <div className="w-full h-95/100 flex flex-col items-center justify-center ">
                    <label className="text-white font-mono font-bold text-3xl my-2" >Set Lock Screen Password</label>
                    <input maxLength={6} value={lockScreenPassword} onChange={(e) => setlockScreenPassword(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2 rounded-md" type="password"/>
                    <button onClick={handleSetLockScreenPassword} className="text-white font-bold border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black  hover:bg-slate-300 rounded-md">Submit</button>
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
    <div className='w-full h-full p-3 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-2xl'>Lock Screen</label>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        <ToggleSwitch/>
        <div className='w-full flex flex-row items-center justify-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-sm'>Set Lock Screen Password</label>
            <div className={`flex flex-row p-2 items-center justify-center ml-5`}>
                <button disabled={is_Off ? 'disabled': null} onClick={() => setShowScreen(!showScreen)} className={`mx-2  text-center items-center font-bold border-2 border-slate-300 cursor-pointer my-2 hover:text-black  hover:bg-slate-300 rounded-md p-1 ${is_Off?'border-slate-600 text-gray-500':'text-gray-900 dark:text-white'} `}>Set</button>
                <button disabled={is_Off ? 'disabled': null} onClick={handleDiscardLockScreenPassword} className={`mx-2 text-center items-center font-bold border-2 border-slate-300 cursor-pointer my-2 hover:text-black  hover:bg-slate-300 rounded-md p-1 ${is_Off?'border-slate-600 text-gray-500':'text-gray-900 dark:text-white'}`}>Discard</button>
            </div>
        </div>
        {showScreen?(<SetLockScreen showScreen={showScreen} setShowScreen={setShowScreen}/>):(<></>)}
    </div>
    </>
    )
}

export default LockScreen;


