import {React ,useState } from 'react'
import { useToast } from '../../../hooks/useToast';
import { change_account_password } from '../../../store/actions/actions';

function Profile({username}) {
    const [profileScreen, setProfileScreen] = useState(false)
    const [checkedAccountPassword, setCheckedAccountPassword] = useState(false)
    const toast = useToast();


function ProfileScreen({
    profileScreen, setProfileScreen
}){
    const [accountPassword, setAccountPassword] = useState('')
    const [accountPassword2, setAccountPassword2] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')


    function handleChangeAccountPassword(){
        
        if(accountPassword === accountPassword2){
            const data = {
                password: accountPassword
            }
            const changeAccountPasswordAction = change_account_password(toast)
            changeAccountPasswordAction(data,'PATCH', setCheckedAccountPassword,setProfileScreen)
            setAccountPassword('')
            setAccountPassword2('')
        }else{
            toast.error('The Passwords dont match ...')
        }
        setCheckedAccountPassword(false)
    }

    function handleCheckAccountPassword(){
            const data = {
                password: verifyPassword
            }
            const changeAccountPasswordAction = change_account_password(toast)
            changeAccountPasswordAction(data,'POST',setCheckedAccountPassword)
            setVerifyPassword('')
    }

    const accountPasswordFragment = (<>


            <div className="w-full h-95/100 flex flex-col items-center justify-center ">
                <label className="text-white font-mono font-bold text-3xl my-2" >Enter the Account Password</label>
                <input value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2 rounded-md" type="password"/>
                <button onClick={handleCheckAccountPassword} className="text-white font-bold border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black  hover:bg-slate-300 rounded-md">Submit</button>
            </div>  

    </>)

    const changeAccountPasswordFragment = (<>


            <div className="w-full h-95/100 flex flex-col items-center justify-center ">
                <label className="text-white font-mono font-bold text-3xl my-2" >Enter Password</label>
                <input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2 rounded-md" type="password"/>
                <label className="text-white font-mono font-bold text-3xl my-2" >Enter Password2</label>
                <input value={accountPassword2} onChange={(e) => setAccountPassword2(e.target.value)} className="text-white border-2 border-slate-300 w-8/10 h-10 indent-2 my-2 rounded-md" type="password"/>
                <button onClick={handleChangeAccountPassword} className="text-white font-bold border-2 border-slate-300 w-8/10 h-10 cursor-pointer my-2 hover:text-black  hover:bg-slate-300 rounded-md">Submit</button>
            </div>  
    </>)
    
    return(<>
             <div className="z-50 text-white absolute top-0 left-0 w-full h-full opaque">
            <div className="w-full p-2 flex flex-row justify-end">
                <button onClick={()=>setProfileScreen(!profileScreen)} className="text-black dark:text-white hover:bg-rose-800 hover:text-white dark:hover:text-black rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                </button>
            </div>
            {checkedAccountPassword?changeAccountPasswordFragment:accountPasswordFragment}
            </div>

    </>)
}

  return (
    <>
    <div className='w-full h-full p-3 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-2xl'>Profile</label>
            <hr className=" w-full my-2 h-1 text-slate-400 rounded-sm dark:bg-gray-700"/>
        </div>
        <div className='w-7/10 flex flex-col items-start p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-sm'>Username</label>
            <input disabled type="text" placeholder={username} className="mt-2 p-1 indent-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className='w-7/10 flex flex-row items-center justify-between p-2'>
            <label className='text-slate-900 dark:text-slate-100 font-bold font-mono text-sm'>Password</label>
        </div>
        <div className='w-7/10 flex flex-col items-start p-2'>
            <div className='w-full flex flex-row items-center relative '>
                <button onClick={()=>setProfileScreen(!profileScreen)} className="mr-1 mt-2 p-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  block w-full dark:bg-gray-700 dark:border-gray-600  dark:text-white cursor-pointer" >
                    Change Password              
                </button>
            </div>
        </div>
        {profileScreen?(<ProfileScreen profileScreen={profileScreen} setProfileScreen={setProfileScreen}/>):(<></>)}
    </div>
    </>
  )
}

export default Profile;
