import React, { useContext, useEffect, useState} from "react"
import { GlobalContext } from "../../../store";
import AddData from "./AddData";
import DeleteData from "./DeleteData";
function Screen(){
    const {screenState, screenDispatch} = useContext(GlobalContext)

    function handleCloseScreen(){
        screenDispatch({type:'HIDE_SCREEN', payload: ''})
    }

    return (
        <div className="absolute top-0 left-0 bg-gray-900 w-screen h-screen flex flex-col">
            <button id="close-screen-btn" onClick={handleCloseScreen} className=" w-4 h-4 m-2 text-white hover:bg-rose-50 hover:text-black rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>            
            <div className="w-full bg-gray-900 h-98/100 flex flex-col justify-center items-center">
                {screenState.content == 'add-data'?<AddData/>:(<></>)}
                {screenState.content == 'delete-data'?(<DeleteData/>):(<></>)}

            </div>
        </div>
    );
}

export default Screen;
