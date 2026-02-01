import React, {useRef,useEffect, useState} from 'react'
import { useToast } from '../../hooks/useToast'
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react'

const ToastTypes = {
    success: {
        icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        progressBarClass: "success",
    },
    warning: {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        progressBarClass: "warning",
    },
    info: {
        icon: <Info className="w-5 h-5 text-indigo-500" />,
        progressBarClass: "info",
    },
    error: {
        icon: <XCircle className="w-5 h-5 text-rose-500" />,
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
        <div className={`w-full shadow-lg dark:shadow-none flex flex-col justify-between rounded-xl bg-stone-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-2 overflow-hidden ${dismissed?"toasts-dismissed":""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='w-full flex flex-row items-center justify-between p-3'>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <div className='flex-shrink-0'>{icon}</div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{message}</p>
                </div>
                <button onClick={handleToastClose} className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <X className='w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300' />
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
