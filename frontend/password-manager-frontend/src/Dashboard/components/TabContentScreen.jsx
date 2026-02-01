import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import {is_authenticated, decrypt_password } from "../../../store/actions/actions";
import { useToast } from "../../../hooks/useToast";
import { XCircle, KeyRound, Lock } from 'lucide-react'
import KeyModal from './KeyModal'

function TabContentScreen({chooseTabContentScreen, setChooseTabContentScreen}){

    const {screenState, screenDispatch} = useContext(GlobalContext)
    const {id, setId} = useContext(GlobalContext)

    const [decryptToken, setDecryptToken] = useState('')
    const [accountPassword, setAccountPassword] = useState('')
    const [modalKey, setModalKey] = useState(null)

    const toast = useToast();

    function handleCloseScreen(){
        screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
    }
    function handleTokenSubmit(){
        const data = {
            id: id,
            key: decryptToken
        }
        const token = localStorage.getItem('token')
        const decryptPasswordAction = decrypt_password(toast, setModalKey)
        decryptPasswordAction(data, token)
    }
    function handleAccountPasswordSubmit(){

        const isAuthenticatedAction = is_authenticated(screenDispatch, toast,handleCloseScreen)
        const data = {
            password: accountPassword
        }
        isAuthenticatedAction(data)
        setAccountPassword('')
    }
    return (
        <>
        <div className="text-white absolute top-0 left-0 w-full h-full opaque rounded-xl">
            <div className="w-full p-3 flex flex-row justify-end">
                <button onClick={handleCloseScreen} className="text-gray-300 hover:text-rose-400 transition-colors cursor-pointer">
                    <XCircle className='w-5 h-5' />
                </button>
            </div>
            {chooseTabContentScreen == 'show' ? (<>
            <div className="w-full h-9/10 flex flex-col items-center justify-center px-8">
                <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6'>
                    <KeyRound className='w-8 h-8 text-indigo-400' />
                </div>
                <label className="text-white font-semibold text-2xl mb-6">Enter Decryption Token</label>
                <input value={decryptToken} onChange={(e)=>setDecryptToken(e.target.value)} className="text-white bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" type="password" placeholder="Enter token..."/>
                <button onClick={handleTokenSubmit} className="mt-4 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-8/10 py-3 cursor-pointer rounded-xl transition-all shadow-lg shadow-indigo-500/20">Submit</button>
            </div>
            </>):(<>
            <div className="w-full h-9/10 flex flex-col items-center justify-center px-8">
                <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6'>
                    <Lock className='w-8 h-8 text-indigo-400' />
                </div>
                <label className="text-white font-semibold text-2xl mb-6">Enter Account Password</label>
                <input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} className="text-white bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" type="password" placeholder="Enter password..."/>
                <button onClick={handleAccountPasswordSubmit} className="mt-4 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-8/10 py-3 cursor-pointer rounded-xl transition-all shadow-lg shadow-indigo-500/20">Submit</button>
            </div>
            </>)}


        </div>
        {modalKey && <KeyModal keyValue={modalKey} onClose={() => { setModalKey(null); handleCloseScreen(); }} />}
        </>
    )

}

export default TabContentScreen;
