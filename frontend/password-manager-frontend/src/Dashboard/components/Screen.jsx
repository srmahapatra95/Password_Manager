import React, { useContext, useEffect, useState} from "react"
import { GlobalContext } from "../../../store";
import AddData from "./AddData";
import DeleteData from "./DeleteData";
import { XCircle } from 'lucide-react'

function Screen(){
    const {screenState, screenDispatch} = useContext(GlobalContext)

    function handleCloseScreen(){
        screenDispatch({type:'HIDE_SCREEN', payload: ''})
    }

    return (
        <div className="absolute top-0 left-0 bg-stone-100 dark:bg-gray-950 w-screen h-screen flex flex-col">
            <button id="close-screen-btn" onClick={handleCloseScreen} className="m-4 text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer transition-colors self-start">
                <XCircle className='w-6 h-6' />
            </button>
            <div className="w-full flex-1 flex flex-col justify-center items-center pb-16">
                {screenState.content == 'add-data'?<AddData/>:(<></>)}
                {screenState.content == 'delete-data'?(<DeleteData/>):(<></>)}

            </div>
        </div>
    );
}

export default Screen;
