import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";
import {is_authenticated, decrypt_password } from "../../../store/actions/actions";

function TabContentScreen({chooseTabContentScreen, setChooseTabContentScreen}){

    const {screenState, screenDispatch} = useContext(GlobalContext)
    const {id, setId} = useContext(GlobalContext)    

    const [decryptToken, setDecryptToken] = useState('')
    const [accountPassword, setAccountPassword] = useState('')

    function handleCloseScreen(){
        screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
    }
    function handleTokenSubmit(){
        const data = {
            id: id,
            key: decryptToken
        }
        console.log(data)
        const token = localStorage.getItem('token')
        const decryptPasswordAction = decrypt_password()
        decryptPasswordAction(data, token)
        handleCloseScreen()
    }
    function handleAccountPasswordSubmit(){
        
        const isAuthenticatedAction = is_authenticated(screenDispatch, handleCloseScreen)
        const data = {
            password: accountPassword
        }
        isAuthenticatedAction(data)
        setAccountPassword('')
    }
    return (
        <> 
        <div className=" text-white absolute w-full h-full opaque">
            <div className="w-full p-2 flex flex-row justify-end">
                <button onClick={handleCloseScreen} className="text-white hover:text-black hover:bg-rose-50 rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                </button>
            </div>
            {chooseTabContentScreen == 'show' ? (<>
            <div className="w-full h-95/100 flex flex-col items-center justify-center">
                <label className="text-white text-3xl my-2" >Enter the Token</label>
                <input value={decryptToken} onChange={(e)=>setDecryptToken(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2" type="password"/>
                <button onClick={handleTokenSubmit} className="text-white border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black hover:bg-slate-300">Submit</button>
            </div>
            </>):(<>
            <div className="w-full h-95/100 flex flex-col items-center justify-center ">
                <label className="text-white text-3xl my-2" >Enter the Account Password</label>
                <input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2" type="password"/>
                <button onClick={handleAccountPasswordSubmit} className="text-white border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black  hover:bg-slate-300">Submit</button>
            </div>  
            </>)}


        </div>
        </>
    )

}

export default TabContentScreen;