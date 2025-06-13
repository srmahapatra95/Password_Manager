import React,{useContext, useEffect,useRef, useState} from "react";
import { GlobalContext } from "../../../store";

function TabContentScreen({chooseTabContentScreen, setChooseTabContentScreen}){

    const {screenState, screenDispatch} = useContext(GlobalContext)    
    function handleCloseScreen(){
        screenDispatch({type: 'DISABLE_TAB_SCREEN', payload: false})
    }
    function handleTokenSubmit(){

    }
    function handleProfilePasswordSubmit(){

        screenDispatch({type: 'ENABLE', payload: true})
    }
    return (
        <> 
        <div className=" text-white absolute w-full h-full opaque">
            <div className="w-full p-2 flex flex-row justify-end">
                <button onClick={handleCloseScreen} className="text-white hover:text-black hover:bg-rose-50 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            {chooseTabContentScreen == 'show' ? (<>
            <div className="w-full h-95/100 flex flex-col items-center justify-center">
                <label className="text-white text-3xl my-2" >Enter the Token</label>
                <input className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2" type="password"/>
                <button onClick={handleTokenSubmit} className="text-white border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black hover:bg-slate-300">Submit</button>
            </div>
            </>):(<>
            <div className="w-full h-95/100 flex flex-col items-center justify-center ">
                <label className="text-white text-3xl my-2" >Enter the Profile Password</label>
                <input className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2" type="password"/>
                <button onClick={handleProfilePasswordSubmit} className="text-white border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black  hover:bg-slate-300">Submit</button>
            </div>  
            </>)}


        </div>
        </>
    )

}

export default TabContentScreen;