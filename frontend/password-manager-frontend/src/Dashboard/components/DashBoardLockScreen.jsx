import React, { useContext, useEffect, useState} from "react"
import { GlobalContext } from "../../../store";
import AddData from "./AddData";
import DeleteData from "./DeleteData";
import { useToast } from "../../../hooks/useToast";
import ProfileCard from "./ProfileCard";
import { check_lock_screen_PIN, lock_unlock } from "../../../store/actions/actions";
function DashBoardLockScreen({lock, setLock}){
    const [pin, setPin] = useState('')
    const [pinChecked, setPinChecked] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        show: false,
        msg: ''
    })
    const {authState, authDispatch} = useContext(GlobalContext)
    const toast = useToast()
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
        <div className="absolute top-0 left-0 bg-gray-200 dark:bg-gray-900 w-screen h-screen flex flex-col">
            <div className="w-full bg-gray-200 dark:bg-gray-900 h-98/100 flex flex-col justify-center items-center">
                <div className="h-2/10 w-2/10 bg-gray-300 dark:bg-slate-800 p-3 sm:flex flex-col justify-center items-center rounded-lg">
                    <div className="w-15 h-15 m-2 flex items-center justify-center bg-slate-400 dark:bg-gray-500 rounded-full">
                        <p className='text-gray-900 dark:text-slate-300 text-2xl font-bold text-mono'>{authState.username?.slice(0,1).toUpperCase()}</p>
                    </div>
                    <div className="hidden sm:block m-2 flex flex-col items-center justify-center font-medium">
                        <p className='text-slate-900 dark:text-slate-300 text-2xl text-center'>{authState.username}</p>
                    </div>
                </div>
                {errorMsg.show?(<>
                    <div className="p-2 flex flex-col items-center justify-center">
                        <p className="text-gray-900 dark:text-slate-200 font-bold text-sm">{errorMsg.msg}</p>
                        <button onClick={() => setErrorMsg({...errorMsg, show:false, msg: ''})} className="my-3 p-2 px-2 cursor-pointer text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">OK</button>
                    </div>
                </>):(<>
                <div class="mb-3 flex flex-row items-center justify-center p-2">
                    <input placeholder="PIN" type="password" value={pin} onChange={(e)=>handlePINChange(e)} id="pin" class="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                </>)}
 
            </div>
        </div>
    );
}

export default DashBoardLockScreen;
