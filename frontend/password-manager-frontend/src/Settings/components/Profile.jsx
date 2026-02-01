import {React ,useState } from 'react'
import { useToast } from '../../../hooks/useToast';
import { change_account_password } from '../../../store/actions/actions';
import { User, Lock, XCircle, KeyRound } from 'lucide-react'

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
            <div className="w-full h-9/10 flex flex-col items-center justify-center px-8">
                <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6'>
                    <Lock className='w-8 h-8 text-indigo-400' />
                </div>
                <label className="text-white font-semibold text-2xl mb-6">Enter Account Password</label>
                <input value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="text-white bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all" type="password" placeholder="Current password..."/>
                <button onClick={handleCheckAccountPassword} className="mt-4 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-8/10 py-3 cursor-pointer rounded-xl transition-all shadow-lg shadow-indigo-500/20">Submit</button>
            </div>
    </>)

    const changeAccountPasswordFragment = (<>
            <div className="w-full h-9/10 flex flex-col items-center justify-center px-8">
                <div className='w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6'>
                    <KeyRound className='w-8 h-8 text-indigo-400' />
                </div>
                <label className="text-white font-semibold text-xl mb-2">New Password</label>
                <input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} className="text-white bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all mb-4" type="password" placeholder="New password..."/>
                <label className="text-white font-semibold text-xl mb-2">Confirm Password</label>
                <input value={accountPassword2} onChange={(e) => setAccountPassword2(e.target.value)} className="text-white bg-white/10 border border-white/20 w-8/10 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all mb-4" type="password" placeholder="Confirm password..."/>
                <button onClick={handleChangeAccountPassword} className="mt-2 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-8/10 py-3 cursor-pointer rounded-xl transition-all shadow-lg shadow-indigo-500/20">Change Password</button>
            </div>
    </>)

    return(<>
             <div className="z-50 text-white absolute top-0 left-0 w-full h-full opaque rounded-xl">
            <div className="w-full p-3 flex flex-row justify-end">
                <button onClick={()=>setProfileScreen(!profileScreen)} className="text-gray-300 hover:text-rose-400 transition-colors cursor-pointer">
                    <XCircle className='w-5 h-5' />
                </button>
            </div>
            {checkedAccountPassword?changeAccountPasswordFragment:accountPasswordFragment}
            </div>

    </>)
}

    const cardClass = "flex items-center gap-3 px-4 py-4 rounded-xl bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 transition-all"

  return (
    <>
    <div className='w-full h-full p-6 flex flex-col justify-start items-start relative'>
        <div className='w-full flex flex-col items-start justify-start mb-6'>
            <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center'>
                    <User className='w-4 h-4 text-indigo-500' />
                </div>
                <label className='text-gray-900 dark:text-gray-100 font-semibold text-xl'>Profile</label>
            </div>
            <div className='w-full h-px bg-gray-200 dark:bg-gray-800 mt-4'></div>
        </div>
        <div className='w-8/10 flex flex-col gap-4'>
            <div className={cardClass}>
                <User className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <div className="flex-1">
                    <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1'>Username</label>
                    <input disabled type="text" placeholder={username} className="bg-transparent border-0 text-gray-900 text-base focus:ring-0 focus:outline-none block w-full dark:text-white placeholder-gray-400"/>
                </div>
            </div>
            <div className={cardClass}>
                <Lock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <div className="flex-1">
                    <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1'>Password</label>
                    <button onClick={()=>setProfileScreen(!profileScreen)} className="flex items-center gap-2 px-4 py-2 bg-stone-50 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer transition-all">
                        <KeyRound className='w-3.5 h-3.5' />
                        Change Password
                    </button>
                </div>
            </div>
        </div>
        {profileScreen?(<ProfileScreen profileScreen={profileScreen} setProfileScreen={setProfileScreen}/>):(<></>)}
    </div>
    </>
  )
}

export default Profile;
