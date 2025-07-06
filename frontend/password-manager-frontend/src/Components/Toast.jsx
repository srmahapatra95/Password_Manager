import React, {useRef,useEffect, useState} from 'react'
import { useToast } from '../../hooks/useToast'

const ToastTypes = {
    success: {
        icon: (<>        
            <svg class="w-5 h-5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
        </>),
        progressBarClass: "success",
    },
    warning: {
        icon: (<>
        <svg class="w-5 h-5 text-orange-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
        </svg>
        </>),
        progressBarClass: "warning",
    },
    info: {
        icon: (<>
            <svg class="w-5 h-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg>
        </>),
        progressBarClass: "info",
    },
    error: {
        icon: (<>
                <svg className="w-5 h-5 text-rose-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
        </>),
        progressBarClass: "error",
    },
}

function Toast({id, type,message}){


    const toast = useToast()
    const {icon, iconClass,progressBarClass} = ToastTypes[type]

    const timerID = useRef(null)
    const [dismissed, setDismissed] = useState(false)
    const progressRef = useRef(null)




    const handleToastClose = () => {
        setDismissed(true)
        setTimeout(() => {
            toast.remove(id);
          }, 400); 
    }

    const handleMouseEnter = () =>{
        clearTimeout(timerID.current);
        progressRef.current.style.animationPlayState = "paused";
    }

    const handleMouseLeave = () => {
        const remainingTime =
        (progressRef.current.offsetWidth /
          progressRef.current.parentElement.offsetWidth) *
        4000;
  
      progressRef.current.style.animationPlayState = "running";
  
      timerID.current = setTimeout(() => {
        handleToastClose();
      }, remainingTime);
    }

    useEffect(() => {
        timerID.current = setTimeout(() => {
            handleToastClose();
        },4000);

        return () => {
            clearTimeout(timerID.current)
        }
    },[])


    return (
        <div className={`w-full shadow-md dark:shadow-none flex flex-col justify-between rounded-md text-slate-200 bg-slate-200 dark:bg-gray-800 border-2 border-slate-200 ${dismissed?"toasts-dismissed":""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='w-full flex flex-row items-center justify-between'>
                <div className='flex flex-row justify-start items-center'>
                    <div className='p-3 rounded-md'>{icon}</div>
                    <p className="text-gray-900 dark:text-gray-100 text-center font-mono font-bold">{message}</p>
                </div>
                <button id="close-screen-btn" onClick={handleToastClose} className=" w-4 h-4 m-2 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle rounded-full text-black dark:text-white hover:bg-rose-800 hover:text-white dark:hover:text-black" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                </button> 

            </div>
            <div className='w-full flex flex-col justify-end items-center'>
                <div className={`toast-progress w-full ${progressBarClass}`}>
                        <div ref={progressRef} className={`toast-progress-bar ${progressBarClass}`}></div>
                </div>
            </div>
        </div>

    )
}

export default Toast;