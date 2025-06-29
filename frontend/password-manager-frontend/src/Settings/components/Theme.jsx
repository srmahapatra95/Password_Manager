import {React ,useState } from 'react'


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


            const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

        const defaultDark =
        storedTheme === "dark" || (storedTheme === null && prefersDark);

        if (defaultDark) {
        setDark();
        }

        const toggleTheme = (e) => {
            if(e.target.checked){
                setDark();
            }else{
                setLight();
            }
        }
        return(<>
        <div className='w-7/10 flex flex-row items-center justify-start p-2'>
            <label className='text-slate-100 font-bold font-mono text-sm'>Light/Dark Theme</label>
            <label class="switch ml-10">
                <input type="checkbox" defaultChecked={defaultDark} onChange={toggleTheme}/>
                <span class="slider round"></span>
            </label>
        </div>
        </>)
    }


    return (
    <>
    <div className='w-full h-full p-3 flex flex-col justify-start items-start bg-gray-900 relative'>
        <div className='w-full flex flex-col items-start justify-start p-2'>
            <label className='text-slate-100 font-bold font-mono text-2xl'>Theme</label>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        <ToggleSwitch/>
    </div>
    </>
    )
}

export default Theme;
