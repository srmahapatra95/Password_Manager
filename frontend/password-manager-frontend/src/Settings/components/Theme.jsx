import {React ,useState } from 'react'
import { set_theme } from '../../../store/actions/actions';

function Theme() {

    function ToggleSwitch(){

        const setDark = () => {

                localStorage.setItem("theme", "dark");
            
                document.body.setAttribute("data-theme", "dark");
            };
            
        const setLight = () => {
            localStorage.setItem("theme", "light");
            document.body.setAttribute("data-theme", "light");
        };
            
        const storedTheme = localStorage.getItem("theme");


        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

        const defaultDark = storedTheme === "dark" || (storedTheme === null && prefersDark);

        if (defaultDark) {
        setDark();
        }

        const toggleTheme = (e) => {
            let theme = null
            if(e.target.checked){
                theme = 'Dark'
                setDark();
            }else{
                theme = 'Light'
                setLight();
            }
           const data = {
                theme: theme
           }
            const changeThemeAction = set_theme()
            changeThemeAction(data)
        }
        return(<>
        <div className='w-7/10 flex flex-row items-center justify-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-sm'>Light/Dark Theme</label>
            <div className='flex flex-row p-2 items-center justify-center ml-5'>
                <div id='light-mode' className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill font-bold text-2xl text-slate-900 dark:text-slate-100" viewBox="0 0 16 16">
                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                    </svg>
                </div>

                <label class="switch mx-2">
                    <input type="checkbox" defaultChecked={defaultDark} onChange={toggleTheme}/>
                    <span class="slider round"></span>
                </label>

                <div id='dark-mode' className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill font-bold text-2xl text-slate-900 dark:text-slate-100" viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                    </svg>
                </div>
            </div>

        </div>
        </>)
    }


    return (
    <>
    <div className='w-full h-full p-3 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-2xl'>Theme</label>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        <ToggleSwitch/>
    </div>
    </>
    )
}

export default Theme;
