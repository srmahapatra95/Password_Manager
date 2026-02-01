import {React ,useState } from 'react'
import { set_theme } from '../../../store/actions/actions';
import { Sun, Moon, Palette } from 'lucide-react'

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
        <div className='flex items-center gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 transition-all'>
            <div className='flex items-center gap-3 flex-1'>
                <Sun className='w-4 h-4 text-amber-500' />
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Light</span>
            </div>
            <label className="switch mx-1">
                <input type="checkbox" defaultChecked={defaultDark} onChange={toggleTheme}/>
                <span className="slider round"></span>
            </label>
            <div className='flex items-center gap-3'>
                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Dark</span>
                <Moon className='w-4 h-4 text-indigo-400' />
            </div>
        </div>
        </>)
    }


    return (
    <>
    <div className='w-full h-full p-6 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start mb-6'>
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center'>
                    <Palette className='w-4 h-4 text-indigo-500' />
                </div>
                <label className='text-gray-900 dark:text-gray-100 font-semibold text-xl'>Theme</label>
            </div>
            <div className='w-full h-px bg-gray-200 dark:bg-gray-800 mt-4'></div>
        </div>
        <div className='w-8/10'>
            <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3'>Appearance</label>
            <ToggleSwitch/>
        </div>
    </div>
    </>
    )
}

export default Theme;
